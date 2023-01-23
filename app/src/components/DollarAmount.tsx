import { useTranslation } from "react-i18next";

interface DollarAmountProps {
  amount: number | string;
}

/**
 * Formatted dollar (USD) amount
 */
const DollarAmount = ({ amount }: DollarAmountProps) => {
  const { t } = useTranslation("components", { keyPrefix: "DollarAmount" });
  return <>{t("amount", { amount })}</>;
};

export default DollarAmount;
