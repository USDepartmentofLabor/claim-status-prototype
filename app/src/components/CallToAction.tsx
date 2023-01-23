import { Link } from "@trussworks/react-uswds";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useTranslation } from "react-i18next";

import { Action, ActionType } from "../types";

dayjs.extend(isSameOrBefore);

interface ActionProps {
  action: Action;
}

const CallToAction = ({ action }: ActionProps) => {
  const { t } = useTranslation("components", {
    keyPrefix: "CallToAction",
  });

  if (action.type === ActionType.questionnaire) {
    return (
      <Link className="usa-button" variant="unstyled" href={"#TODO"}>
        {t("questionnaire")}
      </Link>
    );
  } else if (action.type === ActionType.document_upload) {
    return (
      <Link className="usa-button" variant="unstyled" href={"#TODO"}>
        {t("upload")}
      </Link>
    );
  } else if (action.type === ActionType.complete_claim) {
    return (
      <Link className="usa-button" variant="unstyled" href={"#TODO"}>
        {t("complete_claim")}
      </Link>
    );
  } else if (action.type === ActionType.start_new_claim) {
    return (
      <Link className="usa-button" variant="unstyled" href={"#TODO"}>
        {t("start_claim")}
      </Link>
    );
  } else if (action.type === ActionType.appeal) {
    return (
      <Link className="usa-button" variant="unstyled" href={"#TODO"}>
        {t("start_appeal")}
      </Link>
    );
  }

  return null;
};

export default CallToAction;
