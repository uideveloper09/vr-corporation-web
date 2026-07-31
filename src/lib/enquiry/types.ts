export const contactPreferences = ["call", "whatsapp"] as const;
export type ContactPreference = (typeof contactPreferences)[number];

export const requirementValues = [
  "new-ac",
  "replacement",
  "service-amc",
  "commercial",
  "other",
] as const;
export type RequirementValue = (typeof requirementValues)[number];

export const requirementLabels: Record<RequirementValue, string> = {
  "new-ac": "New AC",
  replacement: "Replacement",
  "service-amc": "Service or AMC",
  commercial: "Commercial System",
  other: "Other",
};

export const preferenceLabels: Record<ContactPreference, string> = {
  call: "Call",
  whatsapp: "WhatsApp",
};

export type EnquiryPayload = {
  fullName: string;
  mobile: string;
  email: string;
  contactPreference: ContactPreference;
  requirement: RequirementValue;
  locality: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type EnquiryFieldErrorKey =
  | "fullName"
  | "mobile"
  | "email"
  | "contactPreference"
  | "requirement"
  | "locality"
  | "consent";

export type EnquirySuccess = {
  ok: true;
  reference: string;
  requestType: string;
};

export type EnquiryFailure = {
  ok: false;
  error: string;
  fieldErrors?: Partial<Record<EnquiryFieldErrorKey, string>>;
};
