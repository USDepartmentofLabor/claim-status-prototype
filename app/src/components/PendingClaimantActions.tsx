import { Link } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import { TODAY } from "../constants";
import { CertificationAvailabilityEnum, ClaimData, IssueType } from "../types";
import { getCertificationAvailability } from "../utils/getCertificationAvailability";
import { getClaimDetails } from "../utils/getClaimDetails";
import { getNextSteps } from "../utils/getNextSteps";
import CallToAction from "./CallToAction";
import NextStep from "./NextStep";

interface PendingClaimantActionsProps {
  data: ClaimData;
}

const PendingClaimantActions = ({ data }: PendingClaimantActionsProps) => {
  const { t } = useTranslation("components", {
    keyPrefix: "PendingClaimantActions",
  });

  const certifications = data.certification_weeks;
  const claimData = getClaimDetails(data);
  const nextSteps = getNextSteps(data);

  const certAvailabilities = certifications.map((cert) => {
    return getCertificationAvailability(cert);
  });
  const hasAvailableWeek = certAvailabilities.includes(
    CertificationAvailabilityEnum.available
  );

  const openIssues = nextSteps.filter((issue) => {
    return issue.actions.find((action) => action.status === "pending");
  });

  const currentlyDenied = openIssues.some((issue) => {
    return issue.type === IssueType.insufficient_wages;
  });

  const displayCertificationReminder =
    certifications.length > 0 &&
    claimData.claimSubmittedAt &&
    TODAY.isBefore(claimData.benefitYearEnd);

  return (
    <div className="margin-bottom-5">
      <h2>{t("heading")}</h2>
      <ul className="usa-list">
        {openIssues.map((issue) => {
          return (
            <li className="margin-bottom-3" key={issue.type}>
              <NextStep issue={issue} />
              {issue.actions.map((action) => {
                return <CallToAction key={action.type} action={action} />;
              })}
            </li>
          );
        })}
        {displayCertificationReminder &&
          (hasAvailableWeek ? (
            <li className="margin-bottom-3">
              <p>
                {t("certification_status", {
                  context: currentlyDenied
                    ? "available_needs_appeal"
                    : "available",
                })}
              </p>
              <Link className="usa-button" variant="unstyled" href={"#TODO"}>
                {t("certify")}
              </Link>
            </li>
          ) : (
            <li className="margin-bottom-3">
              <p>{t("certification_status", { context: "future" })}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PendingClaimantActions;
