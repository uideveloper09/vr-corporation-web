"use client";

import { FormEvent, type ReactNode } from "react";

import {
  useEnquiryForm,
  type EnquiryCoreErrors,
} from "@/components/enquiry/useEnquiryForm";
import type { RequirementValue } from "@/lib/enquiry/types";
import { cx } from "@/lib/cx";

const PREFERENCE_OPTIONS = [
  { value: "call", label: "Call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

const RequiredMark = () => (
  <span className="solutions-page__required" aria-hidden="true">
    *
  </span>
);

export type SolutionsEnquiryFormProps = {
  id: string;
  className?: string;
  consentLabel: string;
  submitLabel: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  requirement: RequirementValue;
  thankYouType: string;
  /** Ops label in email/sheet — defaults to form id. */
  source?: string;
  buildMessage: (ctx: {
    message: string;
    company: string;
  }) => string;
  showCompany?: boolean;
  /** Extra fields rendered after the core grid (before preference). */
  afterCoreFields?: ReactNode;
  /** Merge page-specific validation errors before submit. */
  validateExtra?: () => EnquiryCoreErrors & Record<string, string>;
  /** Optional controlled company (when showCompany). */
  company?: string;
  onCompanyChange?: (value: string) => void;
  companyError?: string;
  onCompanyBlur?: () => void;
};

/**
 * Shared solutions-styled enquiry form.
 * Uses the same postEnquiry path as Contact / Service / Commercial forms.
 */
const SolutionsEnquiryForm = ({
  id,
  className,
  consentLabel,
  submitLabel,
  messageLabel = "About the space",
  messagePlaceholder = "Anything that helps the team review your request.",
  requirement,
  thankYouType,
  source,
  buildMessage,
  showCompany = false,
  afterCoreFields,
  validateExtra,
  company = "",
  onCompanyChange,
  companyError,
  onCompanyBlur,
}: SolutionsEnquiryFormProps) => {
  const form = useEnquiryForm({
    consentErrorMessage: "Consent is required to send this request.",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.setFormError(null);

    const extra = validateExtra?.() ?? {};
    const nextErrors = form.validateCore(extra);

    if (showCompany && !company.trim()) {
      (nextErrors as Record<string, string>).company =
        companyError || "Enter your company name.";
    }

    form.setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await form.submit({
      requirement,
      message: buildMessage({ message: form.values.message, company }),
      thankYouType,
      source: source ?? id,
      failMessage: "Could not send your request. Please try again.",
    });
  };

  return (
    <form
      id={id}
      className={cx("solutions-page__form", className)}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="solutions-page__honeypot" aria-hidden="true">
        <label htmlFor={`${form.formId}-website`}>Website</label>
        <input
          id={`${form.formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.values.website}
          onChange={(event) => form.setWebsite(event.target.value)}
        />
      </div>

      <div className="solutions-page__form-grid">
        {showCompany ? (
          <div className="solutions-page__field solutions-page__field--full">
            <label className="solutions-page__label" htmlFor={`${form.formId}-company`}>
              Company
              <RequiredMark />
            </label>
            <input
              id={`${form.formId}-company`}
              className={cx(
                "solutions-page__input",
                (companyError || (form.errors as Record<string, string>).company) &&
                  "solutions-page__input--error",
              )}
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(event) => {
                onCompanyChange?.(event.target.value);
                if (event.target.value.trim()) {
                  form.setErrors((prev) => {
                    const record = prev as Record<string, string | undefined>;
                    if (!record.company) return prev;
                    const next = { ...prev } as Record<string, string | undefined>;
                    delete next.company;
                    return next as typeof prev;
                  });
                }
              }}
              onBlur={onCompanyBlur}
              aria-invalid={Boolean(
                companyError || (form.errors as Record<string, string>).company,
              )}
              required
            />
            {companyError || (form.errors as Record<string, string>).company ? (
              <p className="solutions-page__field-error">
                {companyError || (form.errors as Record<string, string>).company}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="solutions-page__field">
          <label className="solutions-page__label" htmlFor={`${form.formId}-name`}>
            Full name
            <RequiredMark />
          </label>
          <input
            id={`${form.formId}-name`}
            className={cx(
              "solutions-page__input",
              form.errors.fullName && "solutions-page__input--error",
            )}
            type="text"
            autoComplete="name"
            maxLength={90}
            value={form.values.fullName}
            onChange={(event) => form.setFullName(event.target.value)}
            onBlur={() => form.onFieldBlur("fullName")}
            aria-invalid={Boolean(form.errors.fullName)}
            required
          />
          {form.errors.fullName ? (
            <p className="solutions-page__field-error">{form.errors.fullName}</p>
          ) : null}
        </div>

        <div className="solutions-page__field">
          <label className="solutions-page__label" htmlFor={`${form.formId}-mobile`}>
            Mobile
            <RequiredMark />
          </label>
          <input
            id={`${form.formId}-mobile`}
            className={cx(
              "solutions-page__input",
              form.errors.mobile && "solutions-page__input--error",
            )}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={13}
            placeholder="10-digit mobile"
            value={form.values.mobile}
            onChange={(event) =>
              form.setMobile(event.target.value.replace(/[^\d+\s-]/g, ""))
            }
            onBlur={() => form.onFieldBlur("mobile")}
            aria-invalid={Boolean(form.errors.mobile)}
            required
          />
          {form.errors.mobile ? (
            <p className="solutions-page__field-error">{form.errors.mobile}</p>
          ) : null}
        </div>

        <div className="solutions-page__field solutions-page__field--full">
          <label className="solutions-page__label" htmlFor={`${form.formId}-email`}>
            Email
            <RequiredMark />
          </label>
          <input
            id={`${form.formId}-email`}
            className={cx(
              "solutions-page__input",
              form.errors.email && "solutions-page__input--error",
            )}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.values.email}
            onChange={(event) => form.setEmail(event.target.value)}
            onBlur={() => form.onFieldBlur("email")}
            aria-invalid={Boolean(form.errors.email)}
            required
          />
          {form.errors.email ? (
            <p className="solutions-page__field-error">{form.errors.email}</p>
          ) : null}
        </div>

        <div className="solutions-page__field solutions-page__field--full">
          <label className="solutions-page__label" htmlFor={`${form.formId}-locality`}>
            Locality
            <RequiredMark />
          </label>
          <input
            id={`${form.formId}-locality`}
            className={cx(
              "solutions-page__input",
              form.errors.locality && "solutions-page__input--error",
            )}
            type="text"
            autoComplete="address-level2"
            placeholder="Kharkhoda, Sonipat…"
            value={form.values.locality}
            onChange={(event) => form.setLocality(event.target.value)}
            onBlur={() => form.onFieldBlur("locality")}
            aria-invalid={Boolean(form.errors.locality)}
            required
          />
          {form.errors.locality ? (
            <p className="solutions-page__field-error">{form.errors.locality}</p>
          ) : null}
        </div>
      </div>

      {afterCoreFields}

      <fieldset className="solutions-page__fieldset">
        <legend className="solutions-page__label">
          Preferred contact
          <RequiredMark />
        </legend>
        <div className="solutions-page__options">
          {PREFERENCE_OPTIONS.map((item) => (
            <label key={item.value} className="solutions-page__option">
              <input
                type="radio"
                name="contactPreference"
                value={item.value}
                checked={form.values.preference === item.value}
                onChange={() => {
                  form.setPreference(item.value);
                  form.clearFieldError("preference");
                }}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
        {form.errors.preference ? (
          <p className="solutions-page__field-error">{form.errors.preference}</p>
        ) : null}
      </fieldset>

      <div className="solutions-page__field">
        <label className="solutions-page__label" htmlFor={`${form.formId}-message`}>
          {messageLabel}
          <span className="solutions-page__optional">Optional</span>
        </label>
        <textarea
          id={`${form.formId}-message`}
          className="solutions-page__input solutions-page__textarea"
          rows={4}
          value={form.values.message}
          onChange={(event) => form.setMessage(event.target.value)}
          placeholder={messagePlaceholder}
        />
      </div>

      <div className="solutions-page__consent">
        <label className="solutions-page__consent-label">
          <input
            type="checkbox"
            checked={form.values.consent}
            onChange={(event) => {
              form.setConsent(event.target.checked);
              if (event.target.checked) form.clearFieldError("consent");
            }}
            aria-invalid={Boolean(form.errors.consent)}
          />
          <span>
            {consentLabel}
            <RequiredMark />
          </span>
        </label>
        {form.errors.consent ? (
          <p className="solutions-page__field-error">{form.errors.consent}</p>
        ) : null}
      </div>

      {form.formError ? (
        <p className="solutions-page__form-error" role="alert">
          {form.formError}
        </p>
      ) : null}

      <button
        type="submit"
        className="solutions-page__button solutions-page__button--primary solutions-page__button--on-light solutions-page__form-submit"
        disabled={form.submitting}
      >
        {form.submitting ? "Sending…" : submitLabel}
      </button>
    </form>
  );
};

export default SolutionsEnquiryForm;
