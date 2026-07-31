"use client";

import { FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";

import { contactPageData } from "@/data/pages/contact";
import type { EnquiryFailure, EnquirySuccess } from "@/lib/enquiry/types";
import { cx } from "@/lib/cx";

type FormData = typeof contactPageData.form;

type ContactEnquiryFormProps = {
  data?: FormData;
  className?: string;
};

type FieldKey =
  | "name"
  | "mobile"
  | "email"
  | "preference"
  | "requirement"
  | "locality"
  | "consent";
type FieldErrors = Partial<Record<FieldKey, string>>;

const isValidMobile = (value: string) =>
  /^[6-9]\d{9}$/.test(value.replace(/\s+/g, ""));

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const mapServerFieldErrors = (
  fieldErrors: NonNullable<EnquiryFailure["fieldErrors"]>,
): FieldErrors => ({
  name: fieldErrors.fullName,
  mobile: fieldErrors.mobile,
  email: fieldErrors.email,
  preference: fieldErrors.contactPreference,
  requirement: fieldErrors.requirement,
  locality: fieldErrors.locality,
  consent: fieldErrors.consent,
});

const ContactEnquiryForm = ({
  data = contactPageData.form,
  className,
}: ContactEnquiryFormProps) => {
  const router = useRouter();
  const formId = useId();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [preference, setPreference] = useState("");
  const [requirement, setRequirement] = useState("");
  const [locality, setLocality] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const getFieldError = (field: FieldKey): string | undefined => {
    switch (field) {
      case "name":
        return name.trim() ? undefined : "Please enter your full name.";
      case "mobile":
        if (!mobile.trim()) return "Please enter your mobile number.";
        if (!isValidMobile(mobile)) return "Enter a valid 10-digit mobile number.";
        return undefined;
      case "email":
        if (!email.trim()) return "Please enter your email address.";
        if (!isValidEmail(email)) return "Enter a valid email address.";
        return undefined;
      case "preference":
        return preference ? undefined : "Select a preferred contact method.";
      case "requirement":
        return requirement ? undefined : "Select your requirement.";
      case "locality":
        return locality.trim() ? undefined : "Please enter your locality.";
      case "consent":
        return consent ? undefined : "Consent is required to send this enquiry.";
      default:
        return undefined;
    }
  };

  const clearFieldError = (field: FieldKey) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  /** On focus out: if field is now valid, remove its error automatically. */
  const onFieldBlur = (field: FieldKey) => {
    if (!errors[field]) return;
    if (!getFieldError(field)) clearFieldError(field);
  };

  const setPreferenceAndClear = (value: string) => {
    setPreference(value);
    if (value) clearFieldError("preference");
  };

  const setRequirementAndClear = (value: string) => {
    setRequirement(value);
    if (value) clearFieldError("requirement");
  };

  const setConsentAndClear = (value: boolean) => {
    setConsent(value);
    if (value) clearFieldError("consent");
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    (
      ["name", "mobile", "email", "preference", "requirement", "locality", "consent"] as const
    ).forEach((field) => {
      const error = getFieldError(field);
      if (error) next[field] = error;
    });
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim(),
          mobile: mobile.replace(/\s+/g, ""),
          email: email.trim().toLowerCase(),
          contactPreference: preference,
          requirement,
          locality: locality.trim(),
          message: message.trim(),
          consent,
          website,
        }),
      });

      const result = (await response.json()) as EnquirySuccess | EnquiryFailure;

      if (!response.ok || !result.ok) {
        const failure = result as EnquiryFailure;
        if (failure.fieldErrors) {
          setErrors(mapServerFieldErrors(failure.fieldErrors));
        }
        setFormError(
          failure.error || "Could not send your enquiry. Please try again.",
        );
        return;
      }

      // No PII in URL — type + opaque reference only.
      router.push(`/thank-you?type=${result.requestType}&ref=${result.reference}`);
    } catch {
      setFormError("Could not send your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id={data.id}
      className={cx("contact-page__form", className)}
      onSubmit={onSubmit}
      noValidate
    >
      {/* Honeypot — hidden from users; bots that fill it are ignored server-side. */}
      <div className="contact-page__honeypot" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className="contact-page__field">
        <label className="contact-page__label" htmlFor={`${formId}-${data.fields.name.id}`}>
          {data.fields.name.label}
        </label>
        <input
          id={`${formId}-${data.fields.name.id}`}
          className={cx(
            "contact-page__input",
            errors.name && "contact-page__input--error",
          )}
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder={data.fields.name.placeholder}
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => onFieldBlur("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          required
        />
        {errors.name ? (
          <p id={`${formId}-name-error`} className="contact-page__field-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="contact-page__field">
        <label className="contact-page__label" htmlFor={`${formId}-${data.fields.mobile.id}`}>
          {data.fields.mobile.label}
        </label>
        <input
          id={`${formId}-${data.fields.mobile.id}`}
          className={cx(
            "contact-page__input",
            errors.mobile && "contact-page__input--error",
          )}
          name="mobile"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder={data.fields.mobile.placeholder}
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          onBlur={() => onFieldBlur("mobile")}
          aria-invalid={Boolean(errors.mobile)}
          aria-describedby={errors.mobile ? `${formId}-mobile-error` : undefined}
          required
        />
        {errors.mobile ? (
          <p id={`${formId}-mobile-error`} className="contact-page__field-error">
            {errors.mobile}
          </p>
        ) : null}
      </div>

      <div className="contact-page__field">
        <label className="contact-page__label" htmlFor={`${formId}-${data.fields.email.id}`}>
          {data.fields.email.label}
        </label>
        <input
          id={`${formId}-${data.fields.email.id}`}
          className={cx(
            "contact-page__input",
            errors.email && "contact-page__input--error",
          )}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={data.fields.email.placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => onFieldBlur("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          required
        />
        {errors.email ? (
          <p id={`${formId}-email-error`} className="contact-page__field-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <fieldset
        className={cx(
          "contact-page__fieldset",
          errors.preference && "contact-page__fieldset--error",
        )}
      >
        <legend className="contact-page__label">{data.fields.contactPreference.label}</legend>
        <div className="contact-page__options">
          {data.fields.contactPreference.options.map((option) => (
            <label key={option.value} className="contact-page__option">
              <input
                type="radio"
                name="contactPreference"
                value={option.value}
                checked={preference === option.value}
                onChange={() => setPreferenceAndClear(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {errors.preference ? (
          <p className="contact-page__field-error">{errors.preference}</p>
        ) : null}
      </fieldset>

      <div className="contact-page__field">
        <label
          className="contact-page__label"
          htmlFor={`${formId}-${data.fields.requirement.id}`}
        >
          {data.fields.requirement.label}
        </label>
        <select
          id={`${formId}-${data.fields.requirement.id}`}
          className={cx(
            "contact-page__input contact-page__select",
            errors.requirement && "contact-page__input--error",
          )}
          name="requirement"
          value={requirement}
          onChange={(event) => setRequirementAndClear(event.target.value)}
          onBlur={() => onFieldBlur("requirement")}
          aria-invalid={Boolean(errors.requirement)}
          required
        >
          <option value="">Select requirement</option>
          {data.fields.requirement.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.requirement ? (
          <p className="contact-page__field-error">{errors.requirement}</p>
        ) : null}
      </div>

      <div className="contact-page__field">
        <label
          className="contact-page__label"
          htmlFor={`${formId}-${data.fields.locality.id}`}
        >
          {data.fields.locality.label}
        </label>
        <input
          id={`${formId}-${data.fields.locality.id}`}
          className={cx(
            "contact-page__input",
            errors.locality && "contact-page__input--error",
          )}
          name="locality"
          type="text"
          autoComplete="address-level2"
          placeholder={data.fields.locality.placeholder}
          value={locality}
          onChange={(event) => setLocality(event.target.value)}
          onBlur={() => onFieldBlur("locality")}
          aria-invalid={Boolean(errors.locality)}
          required
        />
        {errors.locality ? (
          <p className="contact-page__field-error">{errors.locality}</p>
        ) : null}
      </div>

      <div className="contact-page__field">
        <label
          className="contact-page__label"
          htmlFor={`${formId}-${data.fields.message.id}`}
        >
          {data.fields.message.label}
          <span className="contact-page__optional">Optional</span>
        </label>
        <textarea
          id={`${formId}-${data.fields.message.id}`}
          className="contact-page__input contact-page__textarea"
          name="message"
          rows={4}
          placeholder={data.fields.message.placeholder}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <div className="contact-page__consent">
        <label className="contact-page__consent-label">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsentAndClear(event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
          />
          <span>{data.consent}</span>
        </label>
        {errors.consent ? (
          <p className="contact-page__field-error">{errors.consent}</p>
        ) : null}
      </div>

      {formError ? (
        <p className="contact-page__form-error" role="alert">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        className="contact-page__button contact-page__button--primary contact-page__form-submit"
        disabled={submitting}
      >
        {submitting ? "Sending…" : data.submitLabel}
      </button>
    </form>
  );
};

export default ContactEnquiryForm;
