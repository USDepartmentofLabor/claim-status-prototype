import { Icon, Link, Table } from "@trussworks/react-uswds";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useTranslation } from "react-i18next";

import { ClaimInfo, PaymentCertification } from "../types";
import { getCertificationAvailability } from "../utils/getCertificationAvailability";
import getCertificationDates from "../utils/getCertificationDates";
import { isCurrentWeek } from "../utils/getCompletedSteps";
import DateRange from "./DateRange";
import DollarAmount from "./DollarAmount";

dayjs.extend(isSameOrAfter);
interface PaymentsProps {
  payments: Array<PaymentCertification>;
  claimInfo: ClaimInfo;
}

const Payments = ({ claimInfo, payments }: PaymentsProps) => {
  const { t } = useTranslation("components", { keyPrefix: "Payments" });

  /**
   * Content for the status cell in a Payments table row
   */
  const renderPaymentStatus = (obj: PaymentCertification) => {
    const certificationDates = getCertificationDates(obj);
    const certAvailability = getCertificationAvailability(obj);

    // status_waiting
    if (
      obj.waiting_week &&
      claimInfo.monetary_determination !== "pending" &&
      claimInfo.separation_determination !== "pending"
    ) {
      return <span>{t("status", { context: "waiting" })}</span>;
    }

    // status_upcoming
    else if (certAvailability === "future") {
      return (
        <div className="display-flex">
          {t("status", {
            context: "upcoming",
            date: certificationDates.openingDate.toDate(),
            formatParams: {
              date: {
                timeZone: "UTC",
              },
            },
          })}
        </div>
      );

      // status_pending_certification
    } else if (certAvailability === "available_to_certify") {
      return (
        <div className="display-flex">
          <Icon.NotificationsActive
            aria-hidden
            className="text-primary usa-icon--size-3 margin-right-05"
          />
          <Link href="#todo">
            {t("status", { context: "pending_certification" })}
          </Link>
        </div>
      );
    }

    // status_pending_eligibility
    else if (
      certAvailability === "completed" &&
      obj.payment_sent_date === null
    ) {
      return (
        <div className="display-flex">
          <Icon.NotificationsActive
            aria-hidden
            className="text-primary usa-icon--size-3 margin-right-05"
          />
          {t("status", { context: "pending_eligibility" })}
        </div>
      );
    }

    // status_expired
    else if (certAvailability === "expired") {
      return <span>{t("status", { context: "expired" })}</span>;
    }

    // status_paid
    else if (
      obj.payment_sent_date &&
      obj.payment_amount !== null &&
      obj.payment_amount > 0
    ) {
      return (
        <div className="display-flex">
          <Icon.CheckCircleOutline
            aria-hidden
            className="text-green usa-icon--size-3 margin-right-05"
          />
          <span>
            {t("status", {
              context: "paid",
              date: new Date(obj.payment_sent_date),
              amount: obj.payment_amount,
              formatParams: {
                date: {
                  timeZone: "UTC",
                },
              },
            })}
          </span>
        </div>
      );
    }

    // status_other
    else {
      return <span>{t("status", { context: "other" })}</span>;
    }
  };

  return (
    <div>
      <h2>{t("heading")}</h2>
      <Table fullWidth stackedStyle="headers">
        <thead>
          <tr>
            <th scope="col">{t("week_column_heading")}</th>
            <th scope="col" className="maxw-card-lg">
              {t("status_column_heading")}
            </th>
            <th scope="col">{t("remaining_balance_column_heading")}</th>
          </tr>
        </thead>
        <tbody className="font-body-2xs">
          {payments.map((obj) => {
            return (
              <tr key={obj.start_date}>
                <th
                  scope="row"
                  className={isCurrentWeek(obj) ? "bg-primary-lightest" : ""}
                >
                  <DateRange start={obj.start_date} end={obj.end_date} />
                </th>
                <td className={isCurrentWeek(obj) ? "bg-primary-lightest" : ""}>
                  {renderPaymentStatus(obj)}
                </td>
                <td className={isCurrentWeek(obj) ? "bg-primary-lightest" : ""}>
                  {obj.payment_amount !== null && // Don't display remaining balance if week not yet paid
                  obj.remaining_balance &&
                  obj.remaining_balance > 0 ? (
                    <DollarAmount amount={obj.remaining_balance} />
                  ) : (
                    <span className="text-base">--</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Payments;
