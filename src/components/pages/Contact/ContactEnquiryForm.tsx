"use client";

import { FormEvent } from "react";
import { useSearchParams } from "next/navigation";

import { useEnquiryForm } from "@/components/enquiry";
import { contactPageData } from "@/data/pages/contact";
import type { RequirementValue } from "@/lib/enquiry/types";
import { requirementValues } from "@/lib/enquiry/types";
import { cx } from "@/lib/cx";

type FormData = typeof contactPageData.form;

type ContactEnquiryFormProps = {
  data?: FormData;
  className?: string;
};

const RequiredMark = () => (
  <span className="contact-page__required" aria-hidden="true">
    *
  </span>
);

const purposeToRequirement = (purpose: string | null) => {
  if (!purpose) return "";
  if (purpose === "commercial") return "commercial";
  if ((requirementValues as readonly string[]).includes(purpose)) return purpose;
  return "";
};

const ContactEnquiryForm = ({
  data = contactPageData.form,
  className,
}: ContactEnquiryFormProps) => {
  const searchParams = useSearchParams();
  const form = useEnquiryForm({
    initialRequirement: purposeToRequirement(searchParams.get("purpose")),
    requireRequirementSelect: true,
  });
  const formId = form.formId;
  const { values, errors } = form;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.setFormError(null);

    const nextErrors = form.validateCore();
    form.setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await form.submit({
      requirement: values.requirement as RequirementValue,
      message: values.message.trim(),
      source: "contact-us",
    });
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
          value={values.website}
          onChange={(event) => form.setWebsite(event.target.value)}
        />
      </div>

      <div className="contact-page__field">
        <label className="contact-page__label" htmlFor={`${formId}-${data.fields.name.id}`}>
          {data.fields.name.label}
          <RequiredMark />
        </label>
        <input
          id={`${formId}-${data.fields.name.id}`}
          className={cx(
            "contact-page__input",
            errors.fullName && "contact-page__input--error",
          )}
          name="fullName"
          type="text"
          autoComplete="name"
          maxLength={90}
          placeholder={data.fields.name.placeholder}
          value={values.fullName}
          onChange={(event) => form.setFullName(event.target.value)}
          onBlur={() => form.onFieldBlur("fullName")}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? `${formId}-name-error` : undefined}
          required
        />
        {errors.fullName ? (
          <p id={`${formId}-name-error`} className="contact-page__field-error">
            {errors.fullName}
          </p>
        ) : null}
      </div>

      <div className="contact-page__field">
        <label className="contact-page__label" htmlFor={`${formId}-${data.fields.mobile.id}`}>
          {data.fields.mobile.label}
          <RequiredMark />
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
          maxLength={13}
          placeholder={data.fields.mobile.placeholder}
          value={values.mobile}
          onChange={(event) =>
            form.setMobile(event.target.value.replace(/[^\d+\s-]/g, ""))
          }
          onBlur={() => form.onFieldBlur("mobile")}
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
          <RequiredMark />
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
          value={values.email}
          onChange={(event) => form.setEmail(event.target.value)}
          onBlur={() => form.onFieldBlur("email")}
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
        <legend className="contact-page__label">
          {data.fields.contactPreference.label}
          <RequiredMark />
        </legend>
        <div className="contact-page__options">
          {data.fields.contactPreference.options.map((option) => (
            <label key={option.value} className="contact-page__option">
              <input
                type="radio"
                name="contactPreference"
                value={option.value}
                checked={values.preference === option.value}
                onChange={() => {
                  form.setPreference(option.value);
                  form.clearFieldError("preference");
                }}
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
          <RequiredMark />
        </label>
        <select
          id={`${formId}-${data.fields.requirement.id}`}
          className={cx(
            "contact-page__input contact-page__select",
            errors.requirement && "contact-page__input--error",
          )}
          name="requirement"
          value={values.requirement}
          onChange={(event) => {
            form.setRequirement(event.target.value);
            if (event.target.value) form.clearFieldError("requirement");
          }}
          onBlur={() => form.onFieldBlur("requirement")}
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
          <RequiredMark />
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
          value={values.locality}
          onChange={(event) => form.setLocality(event.target.value)}
          onBlur={() => form.onFieldBlur("locality")}
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
          value={values.message}
          onChange={(event) => form.setMessage(event.target.value)}
        />
      </div>

      <div className="contact-page__consent">
        <label className="contact-page__consent-label">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => {
              form.setConsent(event.target.checked);
              if (event.target.checked) form.clearFieldError("consent");
            }}
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            {data.consent}
            <RequiredMark />
          </span>
        </label>
        {errors.consent ? (
          <p className="contact-page__field-error">{errors.consent}</p>
        ) : null}
      </div>

      {form.formError ? (
        <p className="contact-page__form-error" role="alert">
          {form.formError}
        </p>
      ) : null}

      <button
        type="submit"
        className="contact-page__button contact-page__button--primary contact-page__form-submit"
        disabled={form.submitting}
      >
        {form.submitting ? "Sending…" : data.submitLabel}
      </button>
    </form>
  );
};

export default ContactEnquiryForm;
