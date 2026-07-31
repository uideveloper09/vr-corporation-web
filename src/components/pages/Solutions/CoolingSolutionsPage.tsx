"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { coolingSolutionsPageData } from "@/data/pages/coolingSolutions";
import { cx } from "@/lib/cx";

import "./SolutionsShared.css";

type CoolingSolutionsPageProps = {
  className?: string;
};

type TabIndicator = {
  left: number;
  top: number;
  width: number;
  height: number;
  visible: boolean;
};

const CoolingSolutionsPage = ({ className }: CoolingSolutionsPageProps) => {
  const data = coolingSolutionsPageData;
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const [indicator, setIndicator] = useState<TabIndicator>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const activeTab = data.tabs.find(
    (tab) =>
      tab.id === typeParam ||
      (typeParam !== null && (tab.types as readonly string[]).includes(typeParam)),
  );

  const filteredCards = (() => {
    if (!typeParam) return data.cards;

    const byCardType = data.cards.filter((card) => card.type === typeParam);
    if (byCardType.length > 0) return byCardType;

    const tab = data.tabs.find((item) => item.id === typeParam);
    if (tab) {
      return data.cards.filter((card) =>
        (tab.types as readonly string[]).includes(card.type),
      );
    }

    return data.cards;
  })();

  const updateIndicator = useCallback(() => {
    const activeId = activeTab?.id;
    const tabEl = activeId ? tabRefs.current.get(activeId) : undefined;

    if (!activeId || !tabEl) {
      setIndicator((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      return;
    }

    setIndicator({
      left: tabEl.offsetLeft,
      top: tabEl.offsetTop,
      width: tabEl.offsetWidth,
      height: tabEl.offsetHeight,
      visible: true,
    });
  }, [activeTab?.id]);

  useLayoutEffect(() => {
    updateIndicator();

    const tabsEl = tabsRef.current;
    if (!tabsEl) return;

    const resizeObserver = new ResizeObserver(() => updateIndicator());
    resizeObserver.observe(tabsEl);
    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  const selectTab = (tabId: string, types: readonly string[]) => {
    const isActive =
      typeParam === tabId ||
      (typeParam !== null && types.includes(typeParam) && activeTab?.id === tabId);

    if (isActive) {
      router.replace(data.route, { scroll: false });
      return;
    }

    router.replace(`${data.route}?type=${tabId}`, { scroll: false });
  };

  return (
    <div className={cx("solutions-page", className)}>
      <Reveal variant="fade" eager delay={160} className="reveal--hero">
        <section className="solutions-page__hero" aria-labelledby="cooling-hero-title">
          <div className="solutions-page__hero-glow" aria-hidden="true" />
          <Container>
            <div className="solutions-page__hero-content">
              <p className="solutions-page__eyebrow solutions-page__eyebrow--on-dark">
                {data.hero.eyebrow}
              </p>
              <h1 id="cooling-hero-title" className="solutions-page__hero-title">
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
                <Link
                  className="solutions-page__button solutions-page__button--secondary"
                  href={data.hero.secondaryCta.href}
                >
                  {data.hero.secondaryCta.label}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40} className="reveal--after-hero">
        <section className="solutions-page__section" aria-labelledby="cooling-cards-title">
          <Container>
            <h2 id="cooling-cards-title" className="solutions-page__section-title">
              Choose a cooling direction
            </h2>
            <p className="solutions-page__section-intro">
              Filter by space type, then explore the system direction that fits.
            </p>

            <div
              ref={tabsRef}
              className="solutions-page__tabs"
              role="tablist"
              aria-label="Filter cooling solutions"
            >
              <span
                className={cx(
                  "solutions-page__tabs-indicator",
                  indicator.visible && "solutions-page__tabs-indicator--visible",
                )}
                style={{
                  transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
                  width: indicator.width,
                  height: indicator.height,
                }}
                aria-hidden="true"
              />
              {data.tabs.map((tab) => {
                const selected = activeTab?.id === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    ref={(node) => {
                      if (node) tabRefs.current.set(tab.id, node);
                      else tabRefs.current.delete(tab.id);
                    }}
                    className={cx(
                      "solutions-page__tab",
                      selected && "solutions-page__tab--active",
                    )}
                    onClick={() => selectTab(tab.id, tab.types)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <Reveal
              key={typeParam ?? "all"}
              variant="up"
              delay={80}
              className="reveal--stagger solutions-page__cards solutions-page__cards--swap"
            >
              {filteredCards.map((card) => (
                <article key={card.id} className="solutions-page__card">
                  <div className="solutions-page__card-media">
                    <Image
                      className="solutions-page__card-image"
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                  <div className="solutions-page__card-body">
                    <p className="solutions-page__card-badge">{card.system}</p>
                    <h3 className="solutions-page__card-title">{card.title}</h3>
                    <span className="solutions-page__card-rule" aria-hidden="true" />
                    <p className="solutions-page__card-copy">{card.copy}</p>
                    <p className="solutions-page__card-meta">Best for: {card.bestFor}</p>
                    <div className="solutions-page__card-cta">
                      <Link
                        className="solutions-page__button solutions-page__button--primary solutions-page__button--on-light"
                        href={card.cta.href}
                      >
                        {card.cta.label}
                      </Link>
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
          aria-labelledby="cooling-decision-title"
        >
          <Container>
            <div className="solutions-page__panel">
              <h2 id="cooling-decision-title" className="solutions-page__section-title">
                {data.decision.title}
              </h2>
              <ol className="solutions-page__steps">
                {data.decision.steps.map((step) => (
                  <li key={step.id} className="solutions-page__step">
                    <h3 className="solutions-page__step-title">{step.title}</h3>
                    <p className="solutions-page__step-body">{step.body}</p>
                  </li>
                ))}
              </ol>
              <Link
                className="solutions-page__button solutions-page__button--primary solutions-page__button--on-light"
                href={data.decision.cta.href}
              >
                {data.decision.cta.label}
              </Link>
              <p className="solutions-page__notice">{data.decision.notice}</p>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" delay={40}>
        <section
          className="solutions-page__section solutions-page__section--alt"
          aria-labelledby="cooling-related-title"
        >
          <Container>
            <h2 id="cooling-related-title" className="solutions-page__section-title">
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

export default CoolingSolutionsPage;
