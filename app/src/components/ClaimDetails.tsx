import { useTranslation } from "react-i18next";

import DateRange from "./DateRange";
import DollarAmount from "./DollarAmount";

export interface ClaimDataProps {
  claimId: string;
  benefitYearStart: string | null;
  benefitYearEnd: string | null;
  weeklyBenefitAmount: number | null;
  remainingBalance: number | null;
  claimSubmittedAt: string | null;
}

const ClaimDetails = (claimData: ClaimDataProps) => {
  const { t } = useTranslation("components", { keyPrefix: "ClaimDetails" });
  const subheadingClass = "font-body-sm margin-bottom-05";
  const submittedClaim =
    !!claimData.claimSubmittedAt && claimData.benefitYearStart !== null;

  return (
    <div className="bg-primary-lightest padding-3 measure-5">
      <h2 className="margin-top-0">{t("heading")}</h2>
      <h3 className={subheadingClass}>{t("id_label")}</h3>
      {claimData.claimId}
      {submittedClaim && (
        <>
          <h3 className={subheadingClass}>{t("benefit_year_label")}</h3>
          {claimData.benefitYearStart && claimData.benefitYearEnd && (
            <DateRange
              start={claimData.benefitYearStart}
              end={claimData.benefitYearEnd}
            />
          )}
          {claimData.weeklyBenefitAmount && (
            <>
              <h3 className={subheadingClass}>{t("weekly_benefit_label")}</h3>
              <DollarAmount amount={claimData.weeklyBenefitAmount} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ClaimDetails;
