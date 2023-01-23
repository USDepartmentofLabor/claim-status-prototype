import dayjs from "dayjs";

import { CERTIFICATION_TIMEOUT_DAYS } from "../constants";
import { Certification } from "../types";

/**
 * Helper for computing the certification's end and opening dates.
 * End date = last day of the relevant week
 * Opening date = first day a claimant can certify for the relevant week
 */
export default function getCertificationDates(certification: Certification) {
  const endDate = dayjs(certification.start_date).add(6, "days");
  const openingDate = endDate.add(1, "day");
  const expirationDate = dayjs(openingDate).add(
    CERTIFICATION_TIMEOUT_DAYS,
    "days"
  );

  return {
    endDate,
    expirationDate,
    openingDate,
  };
}
