import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { TODAY } from "../constants";
import {
  Certification,
  CertificationAvailabilityEnum,
  CertificationStatusEnum,
} from "../types";
import getCertificationDates from "./getCertificationDates";

dayjs.extend(isBetween);

export const getCertificationAvailability = (certification: Certification) => {
  const { expirationDate, openingDate } = getCertificationDates(certification);

  const certWindowOpen = TODAY.isBetween(
    openingDate,
    expirationDate,
    "day",
    "[]" // inclusive
  );

  if (certification.certification_status === CertificationStatusEnum.complete) {
    return CertificationAvailabilityEnum.complete;
  } else if (openingDate.isAfter(TODAY) && !certWindowOpen) {
    return CertificationAvailabilityEnum.future;
  } else if (
    certification.certification_status === CertificationStatusEnum.pending &&
    certWindowOpen
  ) {
    return CertificationAvailabilityEnum.available;
  } else if (
    certification.certification_status === CertificationStatusEnum.pending &&
    !certWindowOpen
  ) {
    return CertificationAvailabilityEnum.expired;
  }
};
