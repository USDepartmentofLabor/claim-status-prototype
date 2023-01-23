import { useTranslation } from "react-i18next";

import { TrackerStep } from "../types";

interface StepProps {
  label: string;
  status: "current" | "complete" | "upcoming";
}

const Step = (props: StepProps) => {
  const { t } = useTranslation("components", { keyPrefix: "StatusIndicator" });

  const classes = ["usa-step-indicator__segment"];
  if (props.status)
    classes.push(`usa-step-indicator__segment--${props.status}`);
  const className = classes.join(" ");

  return (
    <li className={className}>
      <span className="usa-step-indicator__segment-label">
        {props.label}
        <span className="usa-sr-only">
          {t("state_assistive", { context: props.status ?? "upcoming" })}
        </span>
      </span>
    </li>
  );
};

interface StatusIndicatorProps {
  stepsCompleted: number[];
}

const StatusIndicator = ({ stepsCompleted }: StatusIndicatorProps) => {
  const { t } = useTranslation("components", { keyPrefix: "StatusIndicator" });

  const stepsToDisplay = Object.values(TrackerStep);

  return (
    <div
      className="usa-step-indicator usa-step-indicator--counters-sm"
      aria-label={t("label_assistive")}
    >
      <ol className="usa-step-indicator__segments">
        {stepsToDisplay.map((step) => {
          let stepStatus: StepProps["status"];

          if (stepsCompleted.includes(step)) {
            stepStatus = "complete";
          } else if (stepsCompleted.length + 1 === step) {
            stepStatus = "current";
          } else {
            stepStatus = "upcoming";
          }

          return (
            <Step
              key={step}
              label={t(`status_${step}`, {
                context: stepStatus === "complete" ? "complete" : "upcoming",
              })}
              status={stepStatus}
            />
          );
        })}
      </ol>
    </div>
  );
};

export default StatusIndicator;
