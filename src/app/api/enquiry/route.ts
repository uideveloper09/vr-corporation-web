import { NextResponse } from "next/server";

import {
  appendEnquiryToGoogleSheet,
  toSheetEnquiryRow,
} from "@/lib/enquiry/appendToGoogleSheet";
import {
  EnquiryDeliveryError,
  isEnquiryEmailConfigured,
  sendEnquiryEmail,
} from "@/lib/enquiry/sendEnquiryEmail";
import type { EnquiryFailure, EnquirySuccess } from "@/lib/enquiry/types";
import {
  createEnquiryReference,
  enquiryRequestType,
  normalizeEnquiryPayload,
  parseEnquiryBody,
  validateEnquiry,
} from "@/lib/enquiry/validate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    const failure: EnquiryFailure = {
      ok: false,
      error: "Invalid request body.",
    };
    return NextResponse.json(failure, { status: 400 });
  }

  const payload = parseEnquiryBody(body);
  if (!payload) {
    const failure: EnquiryFailure = {
      ok: false,
      error: "Invalid enquiry payload.",
    };
    return NextResponse.json(failure, { status: 400 });
  }

  // Honeypot: pretend success so bots do not learn the trap.
  if (payload.website?.trim()) {
    const fake: EnquirySuccess = {
      ok: true,
      reference: createEnquiryReference(),
      requestType: "cooling-plan",
    };
    return NextResponse.json(fake);
  }

  const fieldErrors = validateEnquiry(payload);
  if (fieldErrors) {
    const failure: EnquiryFailure = {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
    return NextResponse.json(failure, { status: 400 });
  }

  const emailReady = isEnquiryEmailConfigured();
  const sheetReady = Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim());

  if (!emailReady && !sheetReady) {
    const failure: EnquiryFailure = {
      ok: false,
      error: "Enquiry delivery is not configured yet. Please try again later.",
    };
    return NextResponse.json(failure, { status: 503 });
  }

  const normalized = normalizeEnquiryPayload(payload);
  const reference = createEnquiryReference();
  const requestType = enquiryRequestType(normalized.requirement);

  try {
    if (emailReady) {
      await sendEnquiryEmail(normalized, reference);
    }

    if (sheetReady) {
      await appendEnquiryToGoogleSheet(toSheetEnquiryRow(normalized, reference));
    }
  } catch (error) {
    console.error("[enquiry] Delivery failed", error);
    const failure: EnquiryFailure = {
      ok: false,
      error:
        error instanceof EnquiryDeliveryError
          ? error.message
          : "Could not send your enquiry. Please try again in a moment.",
    };
    return NextResponse.json(failure, { status: 502 });
  }

  const success: EnquirySuccess = {
    ok: true,
    reference,
    requestType,
  };

  return NextResponse.json(success);
}
