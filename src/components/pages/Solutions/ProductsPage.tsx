"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getDaikinCategory } from "@/data/products/catalog";
import { productsPageData } from "@/data/pages/products";
import { cx } from "@/lib/cx";

import "./SolutionsShared.css";

type ProductsPageProps = {
  className?: string;
};

type TabIndicator = {
  left: number;
  top: number;
  width: number;
  height: number;
  visible: boolean;
};

const FALLBACK_IMAGE = "/images/brand/01/everyday-home-comfort.png";

const readTypeParam = () => {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("type");
};

const ProductsPage = ({ className }: ProductsPageProps) => {
  const data = productsPageData;
  const [typeParam, setTypeParam] = useState<string | null>("split");
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const [indicator, setIndicator] = useState<TabIndicator>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  useEffect(() => {
    const syncFromUrl = () => {
      setTypeParam(readTypeParam() ?? "split");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const activeCategory = getDaikinCategory(typeParam);
  const activeTab = data.tabs.find((tab) => tab.id === activeCategory?.id);
  const products = activeCategory?.products ?? [];

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
  }, [updateIndicator, products.length]);

  useEffect(() => {
    const activeId = activeTab?.id;
    if (!activeId) return;
    const tabEl = tabRefs.current.get(activeId);
    tabEl?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeTab?.id]);

  const selectTab = (tabId: string) => {
    const nextUrl = `${data.route}?type=${tabId}`;
    window.history.replaceState(window.history.state, "", nextUrl);
    setTypeParam(tabId);
  };

  return (
    <div className={cx("solutions-page", className)}>
      <Reveal variant="fade" eager delay={80} className="reveal--hero">
        <section className="solutions-page__hero" aria-labelledby="products-hero-title">
          <div className="solutions-page__hero-glow" aria-hidden="true" />
          <Container>
            <div className="solutions-page__hero-content">
              <p className="solutions-page__eyebrow solutions-page__eyebrow--on-dark">
                {data.hero.eyebrow}
              </p>
              <h1 id="products-hero-title" className="solutions-page__hero-title">
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

      <Reveal variant="up" eager delay={120} className="reveal--after-hero">
        <section className="solutions-page__section" aria-labelledby="products-cards-title">
          <Container>
            <h2 id="products-cards-title" className="solutions-page__section-title">
              {data.catalog.title}
            </h2>
            <p className="solutions-page__section-intro solutions-page__section-intro--products">
              {activeCategory ? (
                <>
                  <span>{activeCategory.description.replace(/\.\s*$/, "")}</span>
                  <span className="solutions-page__section-intro-sep" aria-hidden="true">
                    ·
                  </span>
                  <span>
                    Showing {products.length} product
                    {products.length === 1 ? "" : "s"}
                  </span>
                </>
              ) : (
                data.catalog.intro
              )}
            </p>

            <div
              ref={tabsRef}
              className="solutions-page__tabs solutions-page__tabs--products"
              role="tablist"
              aria-label="Filter Daikin product categories"
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
                    onClick={() => selectTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="solutions-page__cards solutions-page__cards--products">
              {products.map((product) => {
                const specs = [
                  product.technology ? { label: "Type", value: product.technology } : null,
                  product.starRating
                    ? { label: "Star Rating", value: product.starRating }
                    : null,
                  product.capacity
                    ? { label: "Capacity", value: product.capacity }
                    : null,
                  product.series ? { label: "Series", value: product.series } : null,
                ].filter(Boolean) as Array<{ label: string; value: string }>;

                const summaryIsGeneric = /from Daikin .+ range\.?$/i.test(product.summary);

                return (
                  <article
                    key={product.id}
                    className="solutions-page__card solutions-page__card--product"
                  >
                    <div className="solutions-page__card-media solutions-page__card-media--product">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="solutions-page__card-image solutions-page__card-image--product"
                        src={product.image || FALLBACK_IMAGE}
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="solutions-page__card-body">
                      <p className="solutions-page__card-badge">
                        {activeCategory?.name ?? "Daikin"}
                      </p>
                      <h3 className="solutions-page__card-title">{product.name}</h3>
                      <span className="solutions-page__card-rule" aria-hidden="true" />
                      {!summaryIsGeneric ? (
                        <p className="solutions-page__card-copy">{product.summary}</p>
                      ) : null}
                      {specs.length > 0 ? (
                        <ul className="solutions-page__product-specs">
                          {specs.map((spec) => (
                            <li key={spec.label}>
                              <span className="solutions-page__product-spec-label">
                                {spec.label}
                              </span>
                              <span className="solutions-page__product-spec-value">
                                {spec.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <div className="solutions-page__card-cta">
                        <Link
                          className="solutions-page__button solutions-page__button--primary solutions-page__button--on-light"
                          href="/site-visit"
                        >
                          Enquire About This Product
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal variant="up" eager delay={160}>
        <section
          className="solutions-page__section solutions-page__section--white"
          aria-labelledby="products-decision-title"
        >
          <Container>
            <div className="solutions-page__panel">
              <h2 id="products-decision-title" className="solutions-page__section-title">
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
          aria-labelledby="products-related-title"
        >
          <Container>
            <h2 id="products-related-title" className="solutions-page__section-title">
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

export default ProductsPage;
