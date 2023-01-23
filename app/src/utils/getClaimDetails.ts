import { MAXIMUM_BENEFIT_WEEKS } from "../constants";
import { ClaimData, Payment } from "../types";
import getBenefitYearEndDate from "./getBenefitYearEndDate";

export const getRemainingBalance = (
  weeklyBenefitAmount: number | null,
  payments: Payment[]
) => {
  // incomplete or unsubmitted claim
  if (weeklyBenefitAmount === null) {
    return null;
  }
  const currTotalPaid = payments.reduce((accumulator, obj) => {
    return accumulator + (obj.payment_amount || 0);
  }, 0);

  return weeklyBenefitAmount * MAXIMUM_BENEFIT_WEEKS - currTotalPaid;
};

export const getClaimDetails = (data: ClaimData) => {
  const weeklyBenefitAmount = data.claim_info.weekly_benefit_amount;
  const payments = data.payments;
  const remainingBalance = getRemainingBalance(weeklyBenefitAmount, payments);

  return {
    claimId: data.claim_info.claim_id,
    benefitYearStart: data.claim_info.benefit_year_start,
    benefitYearEnd: getBenefitYearEndDate(data.claim_info.benefit_year_start),
    weeklyBenefitAmount,
    remainingBalance,
    claimSubmittedAt: data.claim_info.submitted_at,
  };
};
