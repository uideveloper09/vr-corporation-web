import { Fragment } from "react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import { heroData } from "@/data/home/hero";

import "./Hero.css";

const TrustShieldIcon = () => (
  <svg
    className="hero__trust-icon"
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17 2.5L6.5 7v8.2c0 6.4 4.4 12.3 10.5 14.3 6.1-2 10.5-7.9 10.5-14.3V7L17 2.5Z"
      stroke="#00A8FF"
      strokeWidth="2"
      fill="rgba(0,168,255,0.12)"
    />
    <path
      d="M11.5 17.2l3.4 3.4 7.2-7.2"
      stroke="#00A8FF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrustStripIcon = ({ type }: { type: "fan" | "nodes" | "shield" | "pin" }) => {
  if (type === "fan") {
    return (
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none" aria-hidden="true">
        <circle cx="29" cy="29" r="5" fill="currentColor" />
        <path
          d="M29 10c4.5 6.5 5.5 12 0 19 5.5-7 11-8.5 19-4-8-1.5-13.5.5-19 4 6.5-4.5 8-10 0-19Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M29 48c-4.5-6.5-5.5-12 0-19-5.5 7-11 8.5-19 4 8 1.5 13.5-.5 19-4-6.5 4.5-8 10 0 19Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M10 29c6.5-4.5 12-5.5 19 0-7-5.5-8.5-11-4-19-1.5 8 .5 13.5 4 19-4.5-6.5-10-8-19 0Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M48 29c-6.5 4.5-12 5.5-19 0 7 5.5 8.5 11 4 19 1.5-8-.5-13.5-4-19 4.5 6.5 10 8 19 0Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "nodes") {
    return (
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="4.5" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="42" cy="16" r="4.5" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="29" cy="29" r="4.5" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="16" cy="42" r="4.5" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="42" cy="42" r="4.5" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M20 18.5 25.5 26M38 18.5 32.5 26M20 39.5 25.5 32M38 39.5 32.5 32"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none" aria-hidden="true">
        <path
          d="M29 8 12 15.5v12.8C12 40.2 19.2 49.5 29 53c9.8-3.5 17-12.8 17-24.7V15.5L29 8Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M29 22.5c-3.2 0-5.8 2.4-5.8 5.6 0 4.2 5.8 9.4 5.8 9.4s5.8-5.2 5.8-9.4c0-3.2-2.6-5.6-5.8-5.6Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" aria-hidden="true">
      <path
        d="M29 8c-8.3 0-15 6.7-15 15 0 11.2 15 27 15 27s15-15.8 15-27c0-8.3-6.7-15-15-15Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="29" cy="23" r="5" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
};

const Hero = () => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero__container">
        <div className="hero__inner">
          <div className="hero__content">
            <span className="hero__badge">{heroData.eyebrow}</span>

            <h1 id="hero-title" className="hero__title">
              {heroData.title.map((line) => (
                <span key={line} className="hero__title-line">
                  {line}
                </span>
              ))}
            </h1>

            <p className="hero__description">{heroData.description}</p>

            <div className="hero__actions">
              <button
                type="button"
                className="hero__button hero__button--primary"
              >
                {heroData.primaryCta}
              </button>

              <button
                type="button"
                className="hero__button hero__button--secondary"
              >
                {heroData.secondaryCta}
              </button>
            </div>

            <div className="hero__trust">
              <TrustShieldIcon />
              <span className="hero__trust-text">{heroData.trustText}</span>
            </div>
          </div>

          <div className="hero__media" aria-hidden="true">
            <Image
              className="hero__visual"
              src="/images/hero/heroDoor-new2.png"
              alt=""
              width={1148}
              height={871}
              priority
            />
            <div className="hero__overlay"></div>
          </div>
        </div>

        <div className="hero__trust-strip" id="trust-strip">
          {heroData.trustStrip.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 ? (
                <span className="hero__trust-divider" aria-hidden="true" />
              ) : null}
              <div className="hero__trust-card">
                <div className="hero__trust-card-icon">
                  <TrustStripIcon type={item.icon} />
                </div>
                <div className="hero__trust-card-copy">
                  <p className="hero__trust-card-title">{item.title}</p>
                  <p className="hero__trust-card-description">
                    {item.description}
                  </p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
