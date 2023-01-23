/**
 * @file Type definitions shared across multiple files. For the most part, these are
 * type definitions for data that comes from the mock API.
 */

export const TrackerStep = {
  file_claim: 1,
  earnings_review: 2,
  claim_review: 3,
  decision_made: 4,
  end_of_benefits: 5,
} as const;

export enum MonetaryDeterminationStatusEnum {
  eligible = "eligible",
  pending = "pending",
  denied = "denied",
}

export enum SeparationDeterminationStatusEnum {
  eligible = "eligible",
  pending = "pending",
  denied = "denied",
}

export enum CertificationStatusEnum {
  pending = "pending",
  complete = "complete",
  expired = "expired",
}

export enum CertificationAvailabilityEnum {
  complete = "completed",
  future = "future",
  available = "available_to_certify",
  expired = "expired",
}

export enum IssueType {
  contested_separation = "contested_separation",
  identity_proofing = "identity_proofing",
  ability_availability = "ability_availability",
  incomplete_claim = "incomplete_claim",
  claim_complete = "claim_complete",
  in_monetary_review = "in_monetary_review",
  insufficient_wages = "insufficient_wages",
  work_search = "work_search",
}

export enum ActionType {
  questionnaire = "questionnaire",
  document_upload = "document_upload",
  start_new_claim = "start_new_claim",
  complete_claim = "complete_claim",
  no_claimant_action = "no_claimant_action",
  appeal = "appeal",
}

export enum ActionStatus {
  pending = "pending",
  complete = "complete",
}

export interface Action {
  type: ActionType;
  status: ActionStatus;
  metadata: Record<string, string | null>; // flexible field for action specific data
}

export interface Issue {
  type: IssueType;
  created_at: string;
  actions: Action[];
}

export interface ClaimInfo {
  benefit_year_start: string;
  weekly_benefit_amount: number | null;
  claim_id: string;
  monetary_determination: MonetaryDeterminationStatusEnum;
  separation_determination: SeparationDeterminationStatusEnum;
  submitted_at: string | null;
}

export interface Payment {
  start_date: string;
  end_date: string;
  waiting_week: boolean;
  payment_amount: number | null;
  payment_sent_date: string | null;
}

export interface Certification {
  start_date: string;
  certification_status: CertificationStatusEnum;
}

export type PaymentCertification = Payment &
  Certification & { remaining_balance?: number };

/**
 * The top-level claim data object returned by the mock API.
 */
export interface ClaimData {
  claim_info: ClaimInfo;
  issues: Issue[];
  certification_weeks: Certification[];
  payments: Payment[];
}
