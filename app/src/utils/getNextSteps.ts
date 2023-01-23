import {
  ActionStatus,
  ActionType,
  ClaimData,
  Issue,
  IssueType,
  MonetaryDeterminationStatusEnum,
} from "../types";
import getBenefitYearEndDate from "./getBenefitYearEndDate";
import { isCompletedClaim } from "./getCompletedSteps";

const incompleteClaim = {
  type: IssueType.incomplete_claim,
  created_at: "2021-12-30",
  actions: [
    {
      type: ActionType.complete_claim,
      status: ActionStatus.pending,
      metadata: {},
    },
  ],
};

const completedClaim = {
  type: IssueType.claim_complete,
  created_at: "",
  actions: [
    {
      type: ActionType.start_new_claim,
      status: ActionStatus.pending,
      metadata: {},
    },
  ],
};

const monetaryReviewClaim = {
  type: IssueType.in_monetary_review,
  created_at: "",
  actions: [
    {
      type: ActionType.no_claimant_action,
      status: ActionStatus.pending,
      metadata: {},
    },
  ],
};

// Our PendingClaimantActions component renders next steps and
// calls to action based on the issues array. However, we still want to display next steps
// in some cases even where there aren't any issues.
// This helper adds those into the data the component consumes.
export const getNextSteps = (data: ClaimData): Issue[] => {
  const nextSteps = [...data.issues];

  if (data.claim_info.submitted_at === null) {
    nextSteps.push(incompleteClaim);
  }

  if (
    data.claim_info.submitted_at &&
    data.claim_info.monetary_determination ===
      MonetaryDeterminationStatusEnum.pending
  ) {
    nextSteps.push(monetaryReviewClaim);
  }
  if (isCompletedClaim(data)) {
    completedClaim.created_at = getBenefitYearEndDate(
      data.claim_info.benefit_year_start
    );

    nextSteps.push(completedClaim);
  }

  return nextSteps;
};
