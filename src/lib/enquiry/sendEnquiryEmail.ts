import {
  preferenceLabels,
  requirementLabels,
  type EnquiryPayload,
} from "./types";

/** Confirmed enquiry inbox — override with ENQUIRY_TO_EMAIL if needed. */
const DEFAULT_ENQUIRY_TO = "jitender@logicalfire.com";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const getEnquiryTo = () =>
  process.env.ENQUIRY_TO_EMAIL?.trim() || DEFAULT_ENQUIRY_TO;

/** Always deliverable via FormSubmit fallback (same pattern as Bitcraftly site). */
export const isEnquiryEmailConfigured = () => true;

export class EnquiryDeliveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnquiryDeliveryError";
  }
}

const buildEnquiryContent = (payload: EnquiryPayload, reference: string) => {
  const fullName = payload.fullName.trim();
  const mobile = payload.mobile.replace(/\s+/g, "");
  const email = payload.email.trim().toLowerCase();
  const preference = preferenceLabels[payload.contactPreference];
  const requirement = requirementLabels[payload.requirement];
  const locality = payload.locality.trim();
  const message = payload.message.trim() || "—";

  const subject = `[VR Enquiry] ${requirement} — ${fullName} (${reference})`;

  const text = [
    `New enquiry from the V R Corporation website`,
    ``,
    `Reference: ${reference}`,
    `Name: ${fullName}`,
    `Mobile: ${mobile}`,
    `Email: ${email}`,
    `Preferred contact: ${preference}`,
    `Requirement: ${requirement}`,
    `Locality: ${locality}`,
    `Message: ${message}`,
    `Consent: Yes`,
    `Source: contact-us`,
  ].join("\n");

  const html = `
    <h2>New enquiry from the V R Corporation website</h2>
    <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
      <tr><td><strong>Mobile</strong></td><td>${escapeHtml(mobile)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Preferred contact</strong></td><td>${escapeHtml(preference)}</td></tr>
      <tr><td><strong>Requirement</strong></td><td>${escapeHtml(requirement)}</td></tr>
      <tr><td><strong>Locality</strong></td><td>${escapeHtml(locality)}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(message)}</td></tr>
      <tr><td><strong>Consent</strong></td><td>Yes</td></tr>
      <tr><td><strong>Source</strong></td><td>contact-us</td></tr>
    </table>
  `;

  const visitorAck =
    "Thank you. Your enquiry has been received by V R Corporation and will be reviewed before the team confirms the next step.";

  return {
    fullName,
    mobile,
    email,
    preference,
    requirement,
    locality,
    message,
    subject,
    text,
    html,
    visitorAck,
    reference,
  };
};

const siteOrigin = () => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (configured) return configured;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

const sendViaResend = async (
  to: string,
  content: ReturnType<typeof buildEnquiryContent>,
): Promise<boolean> => {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) return false;

  const from =
    process.env.ENQUIRY_FROM_EMAIL?.trim() ||
    "V R Corporation Website <noreply@bitcraftly.com>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: content.email,
        subject: content.subject,
        text: content.text,
        html: content.html,
      }),
      cache: "no-store",
    });

    if (response.ok) return true;
    console.error(
      "[enquiry] Resend failed",
      response.status,
      await response.text().catch(() => ""),
    );
  } catch (error) {
    console.error("[enquiry] Resend failed", error);
  }

  return false;
};

/**
 * FormSubmit.co relay — same fallback Bitcraftly uses (no SMTP needed).
 * First delivery to a new inbox requires one-time "Activate Form" email confirmation.
 */
const sendViaFormSubmit = async (
  to: string,
  content: ReturnType<typeof buildEnquiryContent>,
): Promise<"ok" | "needs-activation" | "failed"> => {
  try {
    const origin = siteOrigin();
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: `${origin}/contact-us`,
        },
        body: JSON.stringify({
          name: content.fullName,
          email: content.email,
          mobile: content.mobile,
          contactPreference: content.preference,
          requirement: content.requirement,
          locality: content.locality,
          message: content.message,
          reference: content.reference,
          consent: "Yes",
          source: "contact-us",
          _subject: content.subject,
          _template: "table",
          _captcha: "false",
          _replyto: content.email,
          _autoresponse: content.visitorAck,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(15_000),
      },
    );

    const payload = (await response.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null;

    const message = payload?.message ?? "";
    if (/activation/i.test(message)) {
      console.warn("[enquiry] FormSubmit needs activation for", to);
      return "needs-activation";
    }

    const okFlag = payload?.success;
    const succeeded =
      response.ok && (okFlag === true || okFlag === "true");

    if (succeeded) return "ok";

    console.error(
      "[enquiry] FormSubmit failed",
      response.status,
      message || "unknown",
    );
  } catch (error) {
    console.error("[enquiry] FormSubmit failed", error);
  }

  return "failed";
};

/** Optional SMTP (Gmail App Password etc.) if Resend + FormSubmit both fail. */
const sendViaSmtp = async (
  to: string,
  content: ReturnType<typeof buildEnquiryContent>,
): Promise<boolean> => {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!user || !pass) return false;

  try {
    const nodemailer = await import("nodemailer");
    const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT || "465");
    const from =
      process.env.ENQUIRY_FROM_EMAIL?.trim() ||
      `"V R Corporation Website" <${user}>`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: content.email,
      subject: content.subject,
      text: content.text,
      html: content.html,
    });

    return true;
  } catch (error) {
    console.error("[enquiry] SMTP failed", error);
    return false;
  }
};

export const sendEnquiryEmail = async (
  payload: EnquiryPayload,
  reference: string,
): Promise<void> => {
  const to = getEnquiryTo();
  const content = buildEnquiryContent(payload, reference);

  if (await sendViaResend(to, content)) return;

  const formSubmitResult = await sendViaFormSubmit(to, content);
  if (formSubmitResult === "ok") return;

  if (await sendViaSmtp(to, content)) return;

  if (formSubmitResult === "needs-activation") {
    throw new EnquiryDeliveryError(
      `Check ${to} for a FormSubmit “Activate Form” email, click Activate, then submit again.`,
    );
  }

  throw new EnquiryDeliveryError(
    "Could not send your enquiry. Please try again in a moment.",
  );
};
