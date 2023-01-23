import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { TODAY } from "../constants";
import {
  ActionType,
  Certification,
  CertificationStatusEnum,
  ClaimData,
  Issue,
  MonetaryDeterminationStatusEnum,
  SeparationDeterminationStatusEnum,
  TrackerStep,
} from "../types";
import getBenefitYearEndDate from "./getBenefitYearEndDate";
import { getRemainingBalance } from "./getClaimDetails";

dayjs.extend(isBetween);

export const isCurrentWeek = (certification: Certification) => {
  const endDate = dayjs(certification.start_date).add(6, "days");

  return TODAY.isBetween(dayjs(certification.start_date), endDate, "day", "[]");
};

/**
 *
 * @param certifications
 * @returns most recent 3 weeks including the current week (or all most recent weeks if less than 3 total)
 */
const getLastNWeeks = (certifications: Certification[]) => {
  const currWeekIndex = certifications.findIndex(isCurrentWeek);
  const weeksUpThroughCurrent = certifications.slice(0, currWeekIndex + 1);

  if (weeksUpThroughCurrent.length > 3) {
    return weeksUpThroughCurrent.slice(-3); // if many prior weeks only return last 3
  } else {
    return weeksUpThroughCurrent;
  }
};

const isActiveClaim = (certifications: Certification[]) => {
  const recentWeeks = getLastNWeeks(certifications);
  // if any recent weeks unexpired, still active
  let stillActive = false;
  recentWeeks.forEach((cert) => {
    if (cert.certification_status !== CertificationStatusEnum.expired) {
      stillActive = true;
    }
  });
  return stillActive;
};

const hasActiveIssues = (issues: Issue[]) => {
  // no issues
  if (issues.length === 0) {
    return false;
  }

  // only appeal issues
  if (issues.length === 1 && issues[0].actions[0].type === ActionType.appeal) {
    return false;
  }
  return true;
};

export const isCompletedClaim = (data: ClaimData) => {
  const remainingBalance = getRemainingBalance(
    data.claim_info.weekly_benefit_amount,
    data.payments
  );

  // incomplete or unsubmitted claim
  if (remainingBalance === null) {
    return false;
  }

  if (remainingBalance <= 0) {
    return true;
  }

  if (
    TODAY.isAfter(
      dayjs(getBenefitYearEndDate(data.claim_info.benefit_year_start))
    )
  ) {
    return true;
  }

  return false;
};

export const getCompletedSteps = (data: ClaimData) => {
  const steps: number[] = [];

  // application was created and submitted
  if (data.claim_info && data.claim_info.submitted_at) {
    steps.push(TrackerStep.file_claim);
  } else {
    return steps;
  }

  // If monetary determination was made
  if (
    data.claim_info.monetary_determination !==
    MonetaryDeterminationStatusEnum.pending
  ) {
    steps.push(TrackerStep.earnings_review);
  } else {
    return steps;
  }

  // If both monetary determination and separation determination were made and no active issues
  if (
    data.claim_info.separation_determination !==
      SeparationDeterminationStatusEnum.pending &&
    !hasActiveIssues(data.issues)
  ) {
    steps.push(TrackerStep.claim_review);
  } else {
    return steps;
  }

  // If claim no longer active step is completed
  if (!isActiveClaim(data.certification_weeks)) {
    steps.push(TrackerStep.decision_made);
  } else {
    return steps;
  }

  // claim completed b/c fully paid or benefit year over
  if (isCompletedClaim(data)) {
    steps.push(TrackerStep.end_of_benefits);
  }
  return steps;
};
