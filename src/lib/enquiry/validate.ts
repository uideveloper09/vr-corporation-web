import { requirementToThankYouType } from "@/data/pages/thankYou";

import {
  contactPreferences,
  type EnquiryFailure,
  type EnquiryPayload,
  requirementValues,
} from "./types";

const isValidMobile = (value: string) =>
  /^[6-9]\d{9}$/.test(value.replace(/\s+/g, ""));

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

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
    website: typeof data.website === "string" ? data.website : "",
  };
};

export const validateEnquiry = (
  payload: EnquiryPayload,
): EnquiryFailure["fieldErrors"] | null => {
  const fieldErrors: NonNullable<EnquiryFailure["fieldErrors"]> = {};

  if (!payload.fullName.trim()) {
    fieldErrors.fullName = "Please enter your full name.";
  }

  if (!payload.mobile.trim()) {
    fieldErrors.mobile = "Please enter your mobile number.";
  } else if (!isValidMobile(payload.mobile)) {
    fieldErrors.mobile = "Enter a valid 10-digit mobile number.";
  }

  if (!payload.email.trim()) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!isValidEmail(payload.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

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

  if (!payload.locality.trim()) {
    fieldErrors.locality = "Please enter your locality.";
  }

  if (!payload.consent) {
    fieldErrors.consent = "Consent is required to send this enquiry.";
  }

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
};

export const enquiryRequestType = (requirement: string) =>
  requirementToThankYouType[requirement] ?? "cooling-plan";
