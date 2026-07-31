"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { EnquiryFormAside, useEnquiryForm } from "@/components/enquiry";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { acServiceAmcPageData } from "@/data/pages/acServiceAmc";
import { cx } from "@/lib/cx";
import { scrollToSection } from "@/lib/scrollToSection";

import "./SolutionsShared.css";

type AcServiceAmcPageProps = {
  className?: string;
};

type DomainFieldKey = "service" | "acType" | "units";
type DomainErrors = Partial<Record<DomainFieldKey, string>>;

const AC_TYPES = [
  { value: "split", label: "Split / Inverter" },
  { value: "window", label: "Window" },
  { value: "cassette", label: "Cassette" },
  { value: "ducted", label: "Ducted" },
  { value: "vrv", label: "VRV / VRF" },
  { value: "other", label: "Other / Not sure" },
] as const;

const UNIT_OPTIONS = [
  { value: "1", label: "1 unit" },
  { value: "2", label: "2 units" },
  { value: "3", label: "3 units" },
  { value: "4+", label: "4 or more" },
] as const;

const PREFERENCE_OPTIONS = [
  { value: "call", label: "Call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

const SERVICE_VALUES = acServiceAmcPageData.form.services.map((item) => item.value);

const isValidService = (value: string | null): value is string =>
  Boolean(value && SERVICE_VALUES.includes(value as (typeof SERVICE_VALUES)[number]));

const RequiredMark = () => (
  <span className="solutions-page__required" aria-hidden="true">
    *
  </span>
);

const AcServiceAmcPage = ({ className }: AcServiceAmcPageProps) => {
  const data = acServiceAmcPageData;
  const searchParams = useSearchParams();
  const form = useEnquiryForm({
    consentErrorMessage: "Consent is required to send this request.",
  });
  const formId = form.formId;

  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [service, setService] = useState("");
  const [acType, setAcType] = useState("");
  const [units, setUnits] = useState("");
  const [domainErrors, setDomainErrors] = useState<DomainErrors>({});

  useEffect(() => {
    const fromUrl = searchParams.get("service");
    if (isValidService(fromUrl)) {
      setService(fromUrl);
    }
  }, [searchParams]);

  const clearDomainError = (field: DomainFieldKey) => {
    setDomainErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const selectServiceAndScroll = (nextService: string) => {
    setService(nextService);
    clearDomainError("service");
    scrollToSection(data.form.id);
  };

  const toggleSymptom = (value: string) => {
    setSymptoms((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const getDomainError = (field: DomainFieldKey): string | undefined => {
    switch (field) {
      case "service":
        return service ? undefined : "Select a service type.";
      case "acType":
        return acType ? undefined : "Select your AC type.";
      case "units":
        return units ? undefined : "Select the number of units.";
      default:
        return undefined;
    }
  };

  const onDomainBlur = (field: DomainFieldKey) => {
    const error = getDomainError(field);
    setDomainErrors((prev) => {
      if (!error) {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      }
      if (prev[field] === error) return prev;
      return { ...prev, [field]: error };
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.setFormError(null);

    const nextDomain: DomainErrors = {};
    (["service", "acType", "units"] as const).forEach((field) => {
      const error = getDomainError(field);
      if (error) nextDomain[field] = error;
    });
    setDomainErrors(nextDomain);

    const nextCore = form.validateCore();
    form.setErrors(nextCore);

    if (Object.keys(nextDomain).length > 0 || Object.keys(nextCore).length > 0) {
      return;
    }

    const symptomLabels = data.form.symptoms
      .filter((item) => symptoms.includes(item.value))
      .map((item) => item.label);
    const serviceLabel =
      data.form.services.find((item) => item.value === service)?.label ?? service;
    const acTypeLabel = AC_TYPES.find((item) => item.value === acType)?.label ?? acType;

    const messageParts = [
      `Service: ${serviceLabel}`,
      `AC type: ${acTypeLabel}`,
      `Units: ${units}`,
      symptomLabels.length > 0 ? `Symptoms: ${symptomLabels.join(", ")}` : null,
      form.values.message.trim() ? `Details: ${form.values.message.trim()}` : null,
    ].filter(Boolean);

    await form.submit({
      requirement: "service-amc",
      message: messageParts.join("\n"),
      thankYouType: "service-request",
      source: "ac-service-amc",
      failMessage: "Could not send your request. Please try again.",
    });
  };

  return (
    <div className={cx("solutions-page", className)}>
      <Reveal variant="fade" eager delay={160} className="reveal--hero">
        <section className="solutions-page__hero" aria-labelledby="service-hero-title">
          <div className="solutions-page__hero-glow" aria-hidden="true" />
          <Container>
            <div className="solutions-page__hero-content">
              <p className="solutions-page__eyebrow solutions-page__eyebrow--on-dark">
                {data.hero.eyebrow}
              </p>
              <h1 id="service-hero-title" className="solutions-page__hero-title">
                {data.hero.title}
              </h1>
              <p className="solutions-page__hero-intro">{data.hero.intro}</p>
              <div className="solutions-page__hero-actions">
                <button
                  type="button"
                  className="solutions-page__button solutions-page__button--primary"
                  onClick={() => scrollToSection(data.hero.primaryCta.scrollTo)}
                >
                  {data.hero.primaryCta.label}
                </button>
                <button
                  type="button"
                  className="solutions-page__button solutions-page__button--secondary"
                  onClick={() => {
                    setService("amc");
                    scrollToSection(data.hero.secondaryCta.scrollTo);
                  }}
                >
                  {data.hero.secondaryCta.label}
                </button>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40} className="reveal--after-hero">
        <section className="solutions-page__section" aria-labelledby="service-cards-title">
          <Container>
            <h2 id="service-cards-title" className="solutions-page__section-title">
              Choose the care you need
            </h2>
            <Reveal
              variant="up"
              delay={80}
              className="reveal--stagger solutions-page__cards solutions-page__cards--four"
            >
              {data.cards.map((card) => (
                <article key={card.id} className="solutions-page__card">
                  <div className="solutions-page__card-body">
                    <h3 className="solutions-page__card-title">{card.title}</h3>
                    <span className="solutions-page__card-rule" aria-hidden="true" />
                    <p className="solutions-page__card-copy">{card.copy}</p>
                    <div className="solutions-page__card-cta">
                      <button
                        type="button"
                        className="solutions-page__button solutions-page__button--primary solutions-page__button--on-light"
                        onClick={() => selectServiceAndScroll(card.cta.service)}
                      >
                        {card.cta.label}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </Reveal>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={50}>
        <section
          className="solutions-page__section solutions-page__section--white"
          aria-labelledby="service-form-title"
        >
          <Container>
            <div className="solutions-page__form-layout">
              <div className="solutions-page__panel">
              <h2 id="service-form-title" className="solutions-page__section-title">
                {data.form.title}
              </h2>

              <form
                id={data.form.id}
                className="solutions-page__form"
                onSubmit={onSubmit}
                noValidate
              >
                <div className="solutions-page__honeypot" aria-hidden="true">
                  <label htmlFor={`${formId}-website`}>Website</label>
                  <input
                    id={`${formId}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.values.website}
                    onChange={(event) => form.setWebsite(event.target.value)}
                  />
                </div>

                <fieldset className="solutions-page__fieldset">
                  <legend className="solutions-page__label">
                    Symptoms
                    <span className="solutions-page__optional">Optional</span>
                  </legend>
                  <div className="solutions-page__options">
                    {data.form.symptoms.map((item) => (
                      <label key={item.value} className="solutions-page__option">
                        <input
                          type="checkbox"
                          checked={symptoms.includes(item.value)}
                          onChange={() => toggleSymptom(item.value)}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="solutions-page__form-grid">
                  <div className="solutions-page__field">
                    <label className="solutions-page__label" htmlFor={`${formId}-service`}>
                      Service needed
                      <RequiredMark />
                    </label>
                    <select
                      id={`${formId}-service`}
                      className={cx(
                        "solutions-page__input solutions-page__select",
                        domainErrors.service && "solutions-page__input--error",
                      )}
                      value={service}
                      onChange={(event) => {
                        setService(event.target.value);
                        if (event.target.value) clearDomainError("service");
                      }}
                      onBlur={() => onDomainBlur("service")}
                      aria-invalid={Boolean(domainErrors.service)}
                      required
                    >
                      <option value="">Select service</option>
                      {data.form.services.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {domainErrors.service ? (
                      <p className="solutions-page__field-error">{domainErrors.service}</p>
                    ) : null}
                  </div>

                  <div className="solutions-page__field">
                    <label className="solutions-page__label" htmlFor={`${formId}-ac-type`}>
                      AC type
                      <RequiredMark />
                    </label>
                    <select
                      id={`${formId}-ac-type`}
                      className={cx(
                        "solutions-page__input solutions-page__select",
                        domainErrors.acType && "solutions-page__input--error",
                      )}
                      value={acType}
                      onChange={(event) => {
                        setAcType(event.target.value);
                        if (event.target.value) clearDomainError("acType");
                      }}
                      onBlur={() => onDomainBlur("acType")}
                      aria-invalid={Boolean(domainErrors.acType)}
                      required
                    >
                      <option value="">Select AC type</option>
                      {AC_TYPES.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {domainErrors.acType ? (
                      <p className="solutions-page__field-error">{domainErrors.acType}</p>
                    ) : null}
                  </div>

                  <div className="solutions-page__field">
                    <label className="solutions-page__label" htmlFor={`${formId}-units`}>
                      Number of units
                      <RequiredMark />
                    </label>
                    <select
                      id={`${formId}-units`}
                      className={cx(
                        "solutions-page__input solutions-page__select",
                        domainErrors.units && "solutions-page__input--error",
                      )}
                      value={units}
                      onChange={(event) => {
                        setUnits(event.target.value);
                        if (event.target.value) clearDomainError("units");
                      }}
                      onBlur={() => onDomainBlur("units")}
                      aria-invalid={Boolean(domainErrors.units)}
                      required
                    >
                      <option value="">Select units</option>
                      {UNIT_OPTIONS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {domainErrors.units ? (
                      <p className="solutions-page__field-error">{domainErrors.units}</p>
                    ) : null}
                  </div>

                  <div className="solutions-page__field">
                    <label className="solutions-page__label" htmlFor={`${formId}-locality`}>
                      Locality
                      <RequiredMark />
                    </label>
                    <input
                      id={`${formId}-locality`}
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

                  <div className="solutions-page__field">
                    <label className="solutions-page__label" htmlFor={`${formId}-name`}>
                      Full name
                      <RequiredMark />
                    </label>
                    <input
                      id={`${formId}-name`}
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
                    <label className="solutions-page__label" htmlFor={`${formId}-mobile`}>
                      Mobile
                      <RequiredMark />
                    </label>
                    <input
                      id={`${formId}-mobile`}
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
                    <label className="solutions-page__label" htmlFor={`${formId}-email`}>
                      Email
                      <RequiredMark />
                    </label>
                    <input
                      id={`${formId}-email`}
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
                </div>

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
                  <label className="solutions-page__label" htmlFor={`${formId}-details`}>
                    Additional details
                    <span className="solutions-page__optional">Optional</span>
                  </label>
                  <textarea
                    id={`${formId}-details`}
                    className="solutions-page__input solutions-page__textarea"
                    rows={4}
                    value={form.values.message}
                    onChange={(event) => form.setMessage(event.target.value)}
                    placeholder="Share anything that helps the team prepare for the visit."
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
                      {data.form.consent}
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
                  {form.submitting ? "Sending…" : data.form.submitLabel}
                </button>
                <p className="solutions-page__form-note">{data.form.note}</p>
              </form>
              </div>

              <EnquiryFormAside
                eyebrow={data.formAside.eyebrow}
                title={data.formAside.title}
                copy={data.formAside.copy}
                steps={data.formAside.steps}
                coverage={data.coverage}
                notice={data.notice}
                cta={data.formAside.cta}
              />
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40}>
        <section
          className="solutions-page__section solutions-page__section--alt"
          aria-labelledby="service-related-title"
        >
          <Container>
            <h2 id="service-related-title" className="solutions-page__section-title">
              Related
            </h2>
            <ul className="solutions-page__related">
              {data.related.map((item) => (
                <li key={item.href}>
                  <Link className="solutions-page__related-link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </Reveal>
    </div>
  );
};

export default AcServiceAmcPage;
