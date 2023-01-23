import dayjs from "dayjs";
import { Trans, useTranslation } from "react-i18next";

import { DECISION_DAYS, UNFILED_CLAIM_TIMEOUT_DAYS } from "../constants";
import { Issue, IssueType } from "../types";

const NextStep = ({ issue }: { issue: Issue }) => {
  const { t } = useTranslation("components", {
    keyPrefix: "NextStep",
  });

  const issueType = issue.type;
  const incompleteClaimExpirationDate = dayjs(issue.created_at)
    .add(UNFILED_CLAIM_TIMEOUT_DAYS, "days")
    .format("YYYY-MM-DD");

  switch (issueType) {
    case IssueType.contested_separation:
      return <p>{t("issue", { context: "contested_separation" })}</p>;
    case IssueType.identity_proofing:
      return <p>{t("issue", { context: "identity_proofing" })}</p>;
    case IssueType.ability_availability:
      return <p>{t("issue", { context: "ability_availability" })}</p>;
    case IssueType.incomplete_claim:
      return (
        <p>
          {t("issue", {
            context: "incomplete_claim",
            date: new Date(incompleteClaimExpirationDate), // Pass through as Date to enable localization
            formatParams: {
              date: {
                timezone: "UTC",
              },
            },
          })}
        </p>
      );
    case IssueType.claim_complete:
      return <p>{t("issue", { context: "claim_complete" })}</p>;
    case IssueType.in_monetary_review:
      return (
        <p>
          {t("issue", { context: "in_monetary_review", days: DECISION_DAYS })}
        </p>
      );
    case IssueType.insufficient_wages:
      return (
        <p>
          <Trans
            i18nKey="NextStep.issue_insufficient_wages"
            ns="components"
            components={{
              "determination-link": <a className="usa-link" href={"#TODO"} />,
            }}
          />
        </p>
      );
    case IssueType.work_search:
      return <p>{t("issue", { context: "work_search" })}</p>;
  }
};

export default NextStep;
