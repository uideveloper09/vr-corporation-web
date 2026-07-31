import {
  preferenceLabels,
  requirementLabels,
  type EnquiryPayload,
} from "./types";

export type SheetEnquiryRow = {
  timestamp: string;
  reference: string;
  fullName: string;
  mobile: string;
  email: string;
  contactPreference: string;
  requirement: string;
  locality: string;
  message: string;
  consent: string;
  source: string;
};

export const toSheetEnquiryRow = (
  payload: EnquiryPayload,
  reference: string,
): SheetEnquiryRow => ({
  timestamp: new Date().toISOString(),
  reference,
  fullName: payload.fullName.trim(),
  mobile: payload.mobile.replace(/\s+/g, ""),
  email: payload.email.trim().toLowerCase(),
  contactPreference: preferenceLabels[payload.contactPreference],
  requirement: requirementLabels[payload.requirement],
  locality: payload.locality.trim(),
  message: payload.message.trim(),
  consent: payload.consent ? "Yes" : "No",
  source: "contact-us",
});

/**
 * Appends one enquiry row via a Google Apps Script web-app webhook.
 * Setup: paste `scripts/google-sheets-enquiry-apps-script.js` into Apps Script,
 * deploy as Web App, set GOOGLE_SHEETS_WEBHOOK_URL in env.
 */
export const appendEnquiryToGoogleSheet = async (
  row: SheetEnquiryRow,
): Promise<void> => {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    throw new Error(
      "GOOGLE_SHEETS_WEBHOOK_URL is not configured. Deploy the Apps Script webhook and set the env var.",
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
    redirect: "follow",
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Google Sheet append failed (${response.status})${detail ? `: ${detail.slice(0, 200)}` : ""}`,
    );
  }

  // Apps Script may return text/plain JSON — tolerate empty 200 bodies.
  const text = await response.text().catch(() => "");
  if (!text) return;

  try {
    const parsed = JSON.parse(text) as { ok?: boolean; error?: string };
    if (parsed.ok === false) {
      throw new Error(parsed.error || "Google Sheet reported a failure.");
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Non-JSON success body from Apps Script is fine.
      return;
    }
    throw error;
  }
};
