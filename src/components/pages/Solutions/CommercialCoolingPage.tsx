"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { EnquiryFormAside, useEnquiryForm } from "@/components/enquiry";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { commercialCoolingPageData } from "@/data/pages/commercialCooling";
import { cx } from "@/lib/cx";
import { scrollToSection } from "@/lib/scrollToSection";

import "./SolutionsShared.css";

type CommercialCoolingPageProps = {
  className?: string;
};

type DomainFieldKey = "company" | "industry" | "area" | "stage";
type DomainErrors = Partial<Record<DomainFieldKey, string>>;

const PREFERENCE_OPTIONS = [
  { value: "call", label: "Call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

const SYSTEM_IDS = commercialCoolingPageData.systems.map((item) => item.id);

const isValidSystem = (value: string | null): boolean =>
  Boolean(value && SYSTEM_IDS.includes(value as (typeof SYSTEM_IDS)[number]));

const RequiredMark = () => (
  <span className="solutions-page__required" aria-hidden="true">
    *
  </span>
);

const CommercialCoolingPage = ({ className }: CommercialCoolingPageProps) => {
  const data = commercialCoolingPageData;
  const searchParams = useSearchParams();
  const form = useEnquiryForm({
    consentErrorMessage: "Consent is required to send this enquiry.",
  });
  const formId = form.formId;

  const systemParam = searchParams.get("system");
  const industryParam = searchParams.get("industry");
  const highlightedSystem = isValidSystem(systemParam) ? systemParam : null;
  const industryFromQuery = data.form.industries.some(
    (item) => item.value === industryParam,
  )
    ? industryParam
    : null;

  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState(industryFromQuery ?? "");
  const [area, setArea] = useState("");
  const [stage, setStage] = useState("");
  const [domainErrors, setDomainErrors] = useState<DomainErrors>({});

  useEffect(() => {
    if (industryFromQuery) {
      setIndustry(industryFromQuery);
      window.requestAnimationFrame(() => scrollToSection(data.form.id));
      return;
    }

    if (highlightedSystem) {
      const el = document.getElementById("commercial-systems");
      if (el) {
        window.requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
      }
    }
  }, [highlightedSystem, industryFromQuery, data.form.id]);

  const clearDomainError = (field: DomainFieldKey) => {
    setDomainErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const selectIndustryAndScroll = (nextIndustry: string) => {
    setIndustry(nextIndustry);
    clearDomainError("industry");
    scrollToSection(data.form.id);
  };

  const getDomainError = (field: DomainFieldKey): string | undefined => {
    switch (field) {
      case "company":
        return company.trim() ? undefined : "Enter your company name.";
      case "industry":
        return industry ? undefined : "Select an industry.";
      case "area":
        return area.trim() ? undefined : "Share the approximate area or size.";
      case "stage":
        return stage ? undefined : "Select the project stage.";
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
    (["company", "industry", "area", "stage"] as const).forEach((field) => {
      const error = getDomainError(field);
      if (error) nextDomain[field] = error;
    });
    setDomainErrors(nextDomain);

    const nextCore = form.validateCore();
    form.setErrors(nextCore);

    if (Object.keys(nextDomain).length > 0 || Object.keys(nextCore).length > 0) {
      return;
    }

    const industryLabel =
      data.form.industries.find((item) => item.value === industry)?.label ?? industry;
    const stageLabel =
      data.form.stages.find((item) => item.value === stage)?.label ?? stage;

    const messageParts = [
      `Company: ${company.trim()}`,
      `Industry: ${industryLabel}`,
      `Area / size: ${area.trim()}`,
      `Stage: ${stageLabel}`,
      form.values.message.trim() ? `Notes: ${form.values.message.trim()}` : null,
    ].filter(Boolean);

    await form.submit({
      requirement: "commercial",
      message: messageParts.join("\n"),
      thankYouType: "commercial-enquiry",
      source: "commercial-cooling-solutions",
      failMessage: "Could not send your enquiry. Please try again.",
    });
  };

  return (
    <div className={cx("solutions-page", className)}>
      <Reveal variant="fade" eager delay={160} className="reveal--hero">
        <section
          className="solutions-page__hero"
          aria-labelledby="commercial-hero-title"
        >
          <div className="solutions-page__hero-glow" aria-hidden="true" />
          <Container>
            <div className="solutions-page__hero-content">
              <p className="solutions-page__eyebrow solutions-page__eyebrow--on-dark">
                {data.hero.eyebrow}
              </p>
              <h1 id="commercial-hero-title" className="solutions-page__hero-title">
                {data.hero.title}
              </h1>
              <p className="solutions-page__hero-intro">{data.hero.intro}</p>
              <div className="solutions-page__hero-actions">
                <Link
                  className="solutions-page__button solutions-page__button--primary"
                  href={data.hero.primaryCta.href}
                >
                  {data.hero.primaryCta.label}
                </Link>
                <button
                  type="button"
                  className="solutions-page__button solutions-page__button--secondary"
                  onClick={() => scrollToSection(data.hero.secondaryCta.scrollTo)}
                >
                  {data.hero.secondaryCta.label}
                </button>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40} className="reveal--after-hero">
        <section
          className="solutions-page__section"
          aria-labelledby="commercial-industries-title"
        >
          <Container>
            <h2
              id="commercial-industries-title"
              className="solutions-page__section-title"
            >
              Built around your industry
            </h2>
            <Reveal
              variant="up"
              delay={80}
              className="reveal--stagger solutions-page__cards solutions-page__cards--four"
            >
              {data.industries.map((item) => (
                <article key={item.id} className="solutions-page__card">
                  <div className="solutions-page__card-body">
                    <h3 className="solutions-page__card-title">{item.title}</h3>
                    <span className="solutions-page__card-rule" aria-hidden="true" />
                    <p className="solutions-page__card-copy">{item.copy}</p>
                    <div className="solutions-page__card-cta">
                      <button
                        type="button"
                        className="solutions-page__button solutions-page__button--primary solutions-page__button--on-light"
                        onClick={() => selectIndustryAndScroll(item.cta.industry)}
                      >
                        {item.cta.label}
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
          id="commercial-systems"
          className="solutions-page__section solutions-page__section--white"
          aria-labelledby="commercial-systems-title"
        >
          <Container>
            <h2 id="commercial-systems-title" className="solutions-page__section-title">
              System directions
            </h2>
            <Reveal
              variant="up"
              delay={80}
              className="reveal--stagger solutions-page__cards solutions-page__cards--three"
            >
              {data.systems.map((system) => (
                <article
                  key={system.id}
                  className={cx(
                    "solutions-page__card",
                    highlightedSystem === system.id && "solutions-page__card--highlight",
                  )}
                >
                  <div className="solutions-page__card-body">
                    <h3 className="solutions-page__card-title">{system.title}</h3>
                    <span className="solutions-page__card-rule" aria-hidden="true" />
                    <p className="solutions-page__card-copy">{system.copy}</p>
                  </div>
                </article>
              ))}
            </Reveal>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40}>
        <section
          className="solutions-page__section"
          aria-labelledby="commercial-journey-title"
        >
          <Container>
            <h2 id="commercial-journey-title" className="solutions-page__section-title">
              {data.journey.title}
            </h2>
            <ol className="solutions-page__steps solutions-page__steps--five">
              {data.journey.steps.map((step) => (
                <li key={step.id} className="solutions-page__step">
                  <h3 className="solutions-page__step-title">{step.title}</h3>
                  <p className="solutions-page__step-body">{step.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40}>
        <section
          className="solutions-page__section solutions-page__section--white"
          aria-labelledby="commercial-clients-title"
        >
          <Container>
            <h2 id="commercial-clients-title" className="solutions-page__section-title">
              {data.clients.title}
            </h2>
            <ul className="solutions-page__chips">
              {data.clients.names.map((name) => (
                <li key={name} className="solutions-page__chip">
                  {name}
                </li>
              ))}
            </ul>
            <p className="solutions-page__notice">{data.clients.notice}</p>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40}>
        <section className="solutions-page__section" aria-label="Commercial next step">
          <Container>
            <div className="solutions-page__cta-banner">
              <h2 className="solutions-page__cta-banner-title">{data.finalCta.title}</h2>
              <div className="solutions-page__cta-banner-actions">
                <Link
                  className="solutions-page__button solutions-page__button--primary solutions-page__button--on-light"
                  href={data.finalCta.primaryCta.href}
                >
                  {data.finalCta.primaryCta.label}
                </Link>
                <button
                  type="button"
                  className="solutions-page__button solutions-page__button--secondary solutions-page__button--on-light"
                  onClick={() => scrollToSection(data.finalCta.secondaryCta.scrollTo)}
                >
                  {data.finalCta.secondaryCta.label}
                </button>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={50}>
        <section
          className="solutions-page__section solutions-page__section--alt"
          aria-labelledby="commercial-form-title"
        >
          <Container>
            <div className="solutions-page__form-layout">
              <div className="solutions-page__panel">
              <h2 id="commercial-form-title" className="solutions-page__section-title">
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

                <div className="solutions-page__form-grid">
                  <div className="solutions-page__field">
                    <label className="solutions-page__label" htmlFor={`${formId}-company`}>
                      Company
                      <RequiredMark />
                    </label>
                    <input
                      id={`${formId}-company`}
                      className={cx(
                        "solutions-page__input",
                        domainErrors.company && "solutions-page__input--error",
                      )}
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      onBlur={() => onDomainBlur("company")}
                      aria-invalid={Boolean(domainErrors.company)}
                      required
                    />
                    {domainErrors.company ? (
                      <p className="solutions-page__field-error">{domainErrors.company}</p>
                    ) : null}
                  </div>

                  <div className="solutions-page__field">
                    <label className="solutions-page__label" htmlFor={`${formId}-contact`}>
                      Contact name
                      <RequiredMark />
                    </label>
                    <input
                      id={`${formId}-contact`}
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

                  <div className="solutions-page__field">
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

                  <div className="solutions-page__field">
                    <label
                      className="solutions-page__label"
                      htmlFor={`${formId}-locality`}
                    >
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
                    <label
                      className="solutions-page__label"
                      htmlFor={`${formId}-industry`}
                    >
                      Industry
                      <RequiredMark />
                    </label>
                    <select
                      id={`${formId}-industry`}
                      className={cx(
                        "solutions-page__input solutions-page__select",
                        domainErrors.industry && "solutions-page__input--error",
                      )}
                      value={industry}
                      onChange={(event) => {
                        setIndustry(event.target.value);
                        if (event.target.value) clearDomainError("industry");
                      }}
                      onBlur={() => onDomainBlur("industry")}
                      aria-invalid={Boolean(domainErrors.industry)}
                      required
                    >
                      <option value="">Select industry</option>
                      {data.form.industries.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {domainErrors.industry ? (
                      <p className="solutions-page__field-error">{domainErrors.industry}</p>
                    ) : null}
                  </div>

                  <div className="solutions-page__field">
                    <label className="solutions-page__label" htmlFor={`${formId}-area`}>
                      Area / size
                      <RequiredMark />
                    </label>
                    <input
                      id={`${formId}-area`}
                      className={cx(
                        "solutions-page__input",
                        domainErrors.area && "solutions-page__input--error",
                      )}
                      type="text"
                      placeholder="e.g. 8,000 sq ft office floor"
                      value={area}
                      onChange={(event) => setArea(event.target.value)}
                      onBlur={() => onDomainBlur("area")}
                      aria-invalid={Boolean(domainErrors.area)}
                      required
                    />
                    {domainErrors.area ? (
                      <p className="solutions-page__field-error">{domainErrors.area}</p>
                    ) : null}
                  </div>

                  <div className="solutions-page__field">
                    <label className="solutions-page__label" htmlFor={`${formId}-stage`}>
                      Project stage
                      <RequiredMark />
                    </label>
                    <select
                      id={`${formId}-stage`}
                      className={cx(
                        "solutions-page__input solutions-page__select",
                        domainErrors.stage && "solutions-page__input--error",
                      )}
                      value={stage}
                      onChange={(event) => {
                        setStage(event.target.value);
                        if (event.target.value) clearDomainError("stage");
                      }}
                      onBlur={() => onDomainBlur("stage")}
                      aria-invalid={Boolean(domainErrors.stage)}
                      required
                    >
                      <option value="">Select stage</option>
                      {data.form.stages.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {domainErrors.stage ? (
                      <p className="solutions-page__field-error">{domainErrors.stage}</p>
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
                  <label className="solutions-page__label" htmlFor={`${formId}-notes`}>
                    Project notes
                    <span className="solutions-page__optional">Optional</span>
                  </label>
                  <textarea
                    id={`${formId}-notes`}
                    className="solutions-page__input solutions-page__textarea"
                    rows={4}
                    value={form.values.message}
                    onChange={(event) => form.setMessage(event.target.value)}
                    placeholder="Share timelines, constraints or anything the team should know."
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
              </form>
              </div>

              <EnquiryFormAside
                eyebrow={data.formAside.eyebrow}
                title={data.formAside.title}
                copy={data.formAside.copy}
                steps={data.formAside.steps}
                cta={data.formAside.cta}
              />
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40}>
        <section
          className="solutions-page__section"
          aria-labelledby="commercial-related-title"
        >
          <Container>
            <h2 id="commercial-related-title" className="solutions-page__section-title">
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

export default CommercialCoolingPage;
