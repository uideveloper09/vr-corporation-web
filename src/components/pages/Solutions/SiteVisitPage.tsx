"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { EnquiryFormAside, SolutionsEnquiryForm } from "@/components/enquiry";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { siteVisitPageData } from "@/data/pages/siteVisit";
import { cx } from "@/lib/cx";

import "./SolutionsShared.css";

type SiteVisitPageProps = {
  className?: string;
};

const SiteVisitPage = ({ className }: SiteVisitPageProps) => {
  const data = siteVisitPageData;
  const searchParams = useSearchParams();
  const isCommercial = searchParams.get("purpose") === "commercial";
  const [company, setCompany] = useState("");

  return (
    <div className={cx("solutions-page", className)}>
      <Reveal variant="fade" eager delay={160} className="reveal--hero">
        <section
          className="solutions-page__hero"
          aria-labelledby="site-visit-hero-title"
        >
          <div className="solutions-page__hero-glow" aria-hidden="true" />
          <Container>
            <div className="solutions-page__hero-content">
              <p className="solutions-page__eyebrow solutions-page__eyebrow--on-dark">
                {data.hero.eyebrow}
              </p>
              <h1 id="site-visit-hero-title" className="solutions-page__hero-title">
                {data.hero.title}
              </h1>
              <p className="solutions-page__hero-intro">
                {isCommercial ? data.hero.commercialIntro : data.hero.intro}
              </p>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={50} className="reveal--after-hero">
        <section
          className="solutions-page__section solutions-page__section--white"
          aria-labelledby="site-visit-form-title"
        >
          <Container>
            <div className="solutions-page__form-layout">
              <div className="solutions-page__panel">
                <h2 id="site-visit-form-title" className="solutions-page__section-title">
                  {isCommercial ? data.form.commercialTitle : data.form.title}
                </h2>
                <p className="solutions-page__section-intro">{data.form.intro}</p>

              <SolutionsEnquiryForm
                id={data.form.id}
                source="site-visit"
                consentLabel={data.form.consent}
                  submitLabel={
                    isCommercial
                      ? data.form.commercialSubmitLabel
                      : data.form.submitLabel
                  }
                  messageLabel="Preferred timing / notes"
                  messagePlaceholder="Share preferred timing or anything that helps plan the visit."
                  requirement={isCommercial ? "commercial" : "new-ac"}
                  thankYouType={isCommercial ? "commercial-enquiry" : "site-visit"}
                  showCompany={isCommercial}
                  company={company}
                  onCompanyChange={setCompany}
                  buildMessage={({ message, company: companyValue }) => {
                    const messageParts = isCommercial
                      ? [
                          `Company: ${companyValue.trim()}`,
                          "Request: Commercial Site Study",
                          message.trim()
                            ? `Preferred timing / notes: ${message.trim()}`
                            : null,
                        ]
                      : [
                          "Request: Site Visit",
                          message.trim()
                            ? `Preferred timing / notes: ${message.trim()}`
                            : null,
                        ];
                    return messageParts.filter(Boolean).join("\n");
                  }}
                />
              </div>

              <EnquiryFormAside
                eyebrow={data.formAside.eyebrow}
                title={data.formAside.title}
                copy={data.formAside.copy}
                steps={data.formAside.steps}
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
          aria-labelledby="site-visit-related-title"
        >
          <Container>
            <h2 id="site-visit-related-title" className="solutions-page__section-title">
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

export default SiteVisitPage;
