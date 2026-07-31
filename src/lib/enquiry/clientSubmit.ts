import type {
  EnquiryFailure,
  EnquiryPayload,
  EnquirySuccess,
  RequirementValue,
} from "@/lib/enquiry/types";
import {
  normalizeEmail,
  normalizeFullName,
  normalizeLocality,
  normalizeMobile,
} from "@/lib/validation";

export type EnquirySubmitInput = {
  fullName: string;
  mobile: string;
  email: string;
  contactPreference: string;
  requirement: RequirementValue;
  locality: string;
  message: string;
  consent: boolean;
  source?: string;
  website?: string;
};

export type EnquirySubmitResult =
  | (EnquirySuccess & { httpOk: true })
  | (EnquiryFailure & { httpOk: false });

/**
 * Single client submit path for every enquiry form.
 * Keeps payload shape + normalization identical so mail delivery stays consistent.
 */
export async function postEnquiry(
  input: EnquirySubmitInput,
): Promise<EnquirySubmitResult> {
  const payload: EnquiryPayload = {
    fullName: normalizeFullName(input.fullName),
    mobile: normalizeMobile(input.mobile),
    email: normalizeEmail(input.email),
    contactPreference:
      input.contactPreference as EnquiryPayload["contactPreference"],
    requirement: input.requirement,
    locality: normalizeLocality(input.locality),
    message: input.message.trim(),
    consent: input.consent,
    source: input.source?.trim() || "website",
    website: input.website ?? "",
  };

  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as EnquirySuccess | EnquiryFailure;

  if (!response.ok || !result.ok) {
    const failure = result as EnquiryFailure;
    return {
      ok: false,
      httpOk: false,
      error: failure.error || "Could not send your enquiry. Please try again.",
      fieldErrors: failure.fieldErrors,
    };
  }

  return {
    ok: true,
    httpOk: true,
    reference: result.reference,
    requestType: result.requestType,
  };
}
