import dayjs from "dayjs";

export default function getBenefitYearEndDate(startDate: string) {
  const end = dayjs(startDate).add(364, "days");
  return end.format("YYYY-MM-DD");
}
