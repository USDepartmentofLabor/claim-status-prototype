import {
  CertificationStatusEnum,
  MonetaryDeterminationStatusEnum,
  SeparationDeterminationStatusEnum,
} from "../../src/types";
import { mergePayAndCerts } from "../../src/utils/mergePayAndCerts";

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
  certification_weeks: [
    {
      start_date: "2021-12-18",
      certification_status: CertificationStatusEnum.complete,
    },
  ],
  payments: [
    {
      start_date: "2021-12-18",
      waiting_week: true,
      payment_amount: null,
      payment_sent_date: null,
    },
  ],
};

describe("mergePayAndCerts", () => {
  it("adds end_date if needed", () => {
    // @ts-expect-error: don't yet include end_date
    const payments = mergePayAndCerts(mockClaimData);
    expect(payments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ end_date: "2021-12-24" }),
      ])
    );
  });

  it("adds remaining balance", () => {
    // @ts-expect-error: don't yet include end_date
    const payments = mergePayAndCerts(mockClaimData);
    expect(payments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ remaining_balance: 13000 }),
      ])
    );
  });
});
