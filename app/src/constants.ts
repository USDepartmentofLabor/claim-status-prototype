import dayjs from "dayjs";

// For demo-purposes, our mock API returns a static JSON responses that
// assume the current date is 2022-01-01. You wouldn't need this constant
// in a real app.
export const TODAY = dayjs("2022-01-01");

// The maximum number of weeks that a claimant can receive benefits in a benefit year.
export const MAXIMUM_BENEFIT_WEEKS = 26;

// The maximum number of days that a claimant can certify a week of benefits, before the week expires.
export const CERTIFICATION_TIMEOUT_DAYS = 14;

// The maximum number of days a claimant can have a started claim they have yet to submit
export const UNFILED_CLAIM_TIMEOUT_DAYS = 7;

// The number of days a claimant may wait to receive a monetary eligibility decision
export const DECISION_DAYS = 21;
