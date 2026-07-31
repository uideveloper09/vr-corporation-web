import { requirementToThankYouType } from "@/data/pages/thankYou";
import {
  normalizeEmail,
  normalizeFullName,
  normalizeLocality,
  normalizeMobile,
  validateEmail,
  validateFullName,
  validateLocality,
  validateMobile,
} from "@/lib/validation";

import {
  contactPreferences,
  type EnquiryFailure,
  type EnquiryPayload,
  requirementValues,
} from "./types";

export const createEnquiryReference = () => {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `VR-${stamp}${rand}`;
};

export const parseEnquiryBody = (body: unknown): EnquiryPayload | null => {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;

  return {
    fullName: typeof data.fullName === "string" ? data.fullName : "",
    mobile: typeof data.mobile === "string" ? data.mobile : "",
    email: typeof data.email === "string" ? data.email : "",
    contactPreference:
      typeof data.contactPreference === "string"
        ? (data.contactPreference as EnquiryPayload["contactPreference"])
        : ("" as EnquiryPayload["contactPreference"]),
    requirement:
      typeof data.requirement === "string"
        ? (data.requirement as EnquiryPayload["requirement"])
        : ("" as EnquiryPayload["requirement"]),
    locality: typeof data.locality === "string" ? data.locality : "",
    message: typeof data.message === "string" ? data.message : "",
    consent: data.consent === true,
    source: typeof data.source === "string" ? data.source.trim() : "",
    website: typeof data.website === "string" ? data.website : "",
  };
};

/** Normalize enquiry fields after validation succeeds. */
export const normalizeEnquiryPayload = (
  payload: EnquiryPayload,
): EnquiryPayload => ({
  ...payload,
  fullName: normalizeFullName(payload.fullName),
  mobile: normalizeMobile(payload.mobile),
  email: normalizeEmail(payload.email),
  locality: normalizeLocality(payload.locality),
  message: payload.message.trim(),
});

export const validateEnquiry = (
  payload: EnquiryPayload,
): EnquiryFailure["fieldErrors"] | null => {
  const fieldErrors: NonNullable<EnquiryFailure["fieldErrors"]> = {};

  const fullNameError = validateFullName(payload.fullName);
  if (fullNameError) fieldErrors.fullName = fullNameError;

  const mobileError = validateMobile(payload.mobile);
  if (mobileError) fieldErrors.mobile = mobileError;

  const emailError = validateEmail(payload.email);
  if (emailError) fieldErrors.email = emailError;

  if (
    !contactPreferences.includes(
      payload.contactPreference as (typeof contactPreferences)[number],
    )
  ) {
    fieldErrors.contactPreference = "Select a preferred contact method.";
  }

  if (
    !requirementValues.includes(
      payload.requirement as (typeof requirementValues)[number],
    )
  ) {
    fieldErrors.requirement = "Select your requirement.";
  }

  const localityError = validateLocality(payload.locality);
  if (localityError) fieldErrors.locality = localityError;

  if (!payload.consent) {
    fieldErrors.consent = "Consent is required to send this enquiry.";
  }

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
};

export const enquiryRequestType = (requirement: string) =>
  requirementToThankYouType[requirement] ?? "cooling-plan";
