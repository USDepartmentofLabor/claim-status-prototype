import dayjs from "dayjs";

import { MAXIMUM_BENEFIT_WEEKS } from "../constants";
import {
  Certification,
  ClaimData,
  Payment,
  PaymentCertification,
} from "../types";

const addRemainingBalance = (
  currRemainingBalance: number,
  currentObj: Payment & Certification & { remaining_balance?: number }
) => {
  const payToSubtract = currentObj.payment_amount
    ? currentObj.payment_amount
    : 0;
  currentObj.remaining_balance = currRemainingBalance - payToSubtract;

  return currRemainingBalance - payToSubtract;
};

// Helper to merge payments and certifications since we need both for payments logic
// Also adds in end dates, remaining balance per week
export const mergePayAndCerts = (
  data: ClaimData
): Array<PaymentCertification> => {
  const mergedData = data.payments.map((p) => {
    const matchingCert = data.certification_weeks.find((cert) => {
      // dynamically add end date if needed
      if (!p.end_date) {
        p.end_date = dayjs(p.start_date).add(6, "days").format("YYYY-MM-DD");
      }
      return p.start_date === cert.start_date && cert;
    });
    if (!matchingCert) throw new Error("no matching certification found");
    return { ...matchingCert, ...p };
  });

  if (data.claim_info.weekly_benefit_amount) {
    // add remaining balance for each row
    let remainingBalance =
      data.claim_info.weekly_benefit_amount * MAXIMUM_BENEFIT_WEEKS;

    mergedData.forEach((data) => {
      remainingBalance = addRemainingBalance(remainingBalance, data);
    });
  }

  return mergedData;
};
