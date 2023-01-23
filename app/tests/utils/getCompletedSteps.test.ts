import {
  CertificationStatusEnum,
  MonetaryDeterminationStatusEnum,
  SeparationDeterminationStatusEnum,
} from "../../src/types";
import { getCompletedSteps } from "../../src/utils/getCompletedSteps";

const mockClaimData = {
  claim_info: {
    benefit_year_start: "2021-12-11",
    weekly_benefit_amount: 500,
    claim_id: "123",
    monetary_determination: MonetaryDeterminationStatusEnum.eligible,
    separation_determination: SeparationDeterminationStatusEnum.eligible,
    submitted_at: "2021-12-11",
  },
  issues: [],
  certification_weeks: [],
  payments: [],
};

const mockCertCurrentWeek = {
  start_date: "2022-01-01",
  end_date: "2022-01-06",
  certification_status: CertificationStatusEnum.complete,
};

describe("getCompletedSteps", () => {
  it("returns an empty array if claim_info.submitted_at missing", () => {
    const data = {
      ...mockClaimData,
      claim_info: {
        ...mockClaimData.claim_info,
        submitted_at: null,
      },
    };

    const steps = getCompletedSteps(data);
    expect(steps).toEqual([]);
  });

  it("returns just step 1 completed if monetary determination not yet made", () => {
    const data = {
      ...mockClaimData,
      claim_info: {
        ...mockClaimData.claim_info,
        monetary_determination: MonetaryDeterminationStatusEnum.pending,
      },
    };
    const steps = getCompletedSteps(data);
    expect(steps).toEqual([1]);
  });

  it("returns up to step 2 completed if monetary determination made but separation determination pending", () => {
    const data = {
      ...mockClaimData,
      claim_info: {
        ...mockClaimData.claim_info,
        monetary_determination: MonetaryDeterminationStatusEnum.eligible,
        separation_determination: SeparationDeterminationStatusEnum.pending,
      },
    };
    const steps = getCompletedSteps(data);
    expect(steps).toEqual([1, 2]);
  });

  it("returns up to step 3 if both separation and monetary determination are complete and claim still active", () => {
    const data = {
      ...mockClaimData,
      certification_weeks: [mockCertCurrentWeek],
    };

    const steps = getCompletedSteps(data);
    expect(steps).toEqual([1, 2, 3]);
  });

  it("returns through step 4 if claim inactive and incomplete", () => {
    const cert = mockCertCurrentWeek;
    cert.certification_status = CertificationStatusEnum.expired;

    const data = {
      ...mockClaimData,
      certification_weeks: [cert],
    };

    const steps = getCompletedSteps(data);
    expect(steps).toEqual([1, 2, 3, 4]);
  });

  it("returns all steps complete once claim complete", () => {
    const data = {
      ...mockClaimData,
      claim_info: {
        ...mockClaimData.claim_info,
        benefit_year_start: "2020-12-10", // benefit year over
      },
      certification_weeks: [mockCertCurrentWeek],
      payments: [
        {
          start_date: "2020-01-01",
          end_date: "2020-01-07",
          waiting_week: false,
          payment_amount: null,
          payment_sent_date: null,
        },
      ],
    };

    const steps = getCompletedSteps(data);
    expect(steps).toEqual([1, 2, 3, 4, 5]);
  });
});
