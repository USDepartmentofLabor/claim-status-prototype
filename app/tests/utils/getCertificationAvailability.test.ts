import {
  CertificationAvailabilityEnum,
  CertificationStatusEnum,
} from "src/types";
import { getCertificationAvailability } from "src/utils/getCertificationAvailability";

describe("getCertificationAvailability", () => {
  it("returns `complete` if status is complete", () => {
    expect(
      getCertificationAvailability({
        start_date: "2020-12-12",
        certification_status: CertificationStatusEnum.complete,
      })
    ).toBe(CertificationAvailabilityEnum.complete);
  });

  it("returns `future` if status is pending and opening date is in the future", () => {
    expect(
      getCertificationAvailability({
        // Current date = 2022-01-01, so this is a week that hasn't been reached yet
        start_date: "2022-01-09",
        certification_status: CertificationStatusEnum.pending,
      })
    ).toBe(CertificationAvailabilityEnum.future);
  });

  it("returns `available` if status is pending and opening date is the current date or in the past, and expiration date is current date or in the future", () => {
    expect(
      getCertificationAvailability({
        start_date: "2021-12-19",
        certification_status: CertificationStatusEnum.pending,
      })
    ).toBe(CertificationAvailabilityEnum.available);
  });

  it("returns `expired` if status is pending and opening date is in the past and expiration date is in the past", () => {
    expect(
      getCertificationAvailability({
        start_date: "2021-12-05",
        certification_status: CertificationStatusEnum.pending,
      })
    ).toBe(CertificationAvailabilityEnum.expired);
  });
});
