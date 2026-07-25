"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { cx } from "@/lib/cx";

import "./SiteLoader.css";

const MIN_SPLASH_MS = 700;

const SiteLoader = () => {
  const [bootDone, setBootDone] = useState(false);
  const [splashOut, setSplashOut] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let finished = false;
    let hideTimeout = 0;
    let safetyTimeout = 0;
    const startedAt = performance.now();

    const finish = () => {
      if (finished) return;
      finished = true;

      const wait = Math.max(0, MIN_SPLASH_MS - (performance.now() - startedAt));
      hideTimeout = window.setTimeout(() => {
        setSplashOut(true);
        hideTimeout = window.setTimeout(() => {
          setBootDone(true);
          document.documentElement.dataset.appReady = "true";
          window.dispatchEvent(new Event("vr:app-ready"));
        }, 420);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    safetyTimeout = window.setTimeout(finish, 4000);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(hideTimeout);
      window.clearTimeout(safetyTimeout);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    let scrollIdleId = 0;

    const update = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const next = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      setScrollProgress(next);
      setScrolling(window.scrollY > 8);
      ticking = false;
    };

    const onScroll = () => {
      setScrolling(true);
      window.clearTimeout(scrollIdleId);
      scrollIdleId = window.setTimeout(() => setScrolling(false), 140);

      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(scrollIdleId);
    };
  }, []);

  return (
    <>
      {!bootDone ? (
        <div
          className={cx("site-loader", splashOut && "site-loader--out")}
          role="status"
          aria-live="polite"
          aria-label="Loading V R Corporation"
        >
          <div className="site-loader__glow" aria-hidden="true" />

          <div className="site-loader__mark">
            <span className="site-loader__ring" aria-hidden="true" />
            <Image
              className="site-loader__logo"
              src="/images/logos/logo-symbol.png"
              alt=""
              width={96}
              height={64}
              priority
              unoptimized
            />
          </div>

          <p className="site-loader__label">V R Corporation</p>

          <div className="site-loader__track" aria-hidden="true">
            <span className="site-loader__bar" />
          </div>
        </div>
      ) : null}

      <div
        className={cx(
          "scroll-loader",
          (scrolling || scrollProgress > 2) && "scroll-loader--visible",
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
        aria-label="Page scroll progress"
      >
        <div
          className="scroll-loader__fill"
          style={{ width: `${scrollProgress}%` }}
        >
          {scrollProgress > 1.5 ? (
            <span className="scroll-loader__logo-wrap" aria-hidden="true">
              <Image
                className="scroll-loader__logo"
                src="/images/logos/logo-symbol.png"
                alt=""
                width={28}
                height={18}
                unoptimized
              />
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SiteLoader;
