import { useTranslation } from "react-i18next";

interface DateRangeProps {
  /** ISO 8601 date string */
  start: string;
  /** ISO 8601 date string */
  end: string;
  timeZone?: string;
}

/**
 * Internationalized range of two dates
 */
const DateRange = ({ start, end, timeZone = "UTC" }: DateRangeProps) => {
  const { t } = useTranslation("components", { keyPrefix: "DateRange" });
  const formatParams = {
    start: { timeZone },
    end: { timeZone },
  };

  return (
    <span className="tablet-lg:text-no-wrap">
      {t("range", { start: new Date(start), end: new Date(end), formatParams })}
    </span>
  );
};

export default DateRange;
