"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import BrandLogo from "@/components/brand/BrandLogo";
import Container from "@/components/ui/Container";
import { navigation, type NavIcon } from "@/data/navigation";
import { cx } from "@/lib/cx";

import "./Header.css";

const DRAWER_MS = 340;
const DRAWER_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const SnowflakeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 3v18M5.5 7.5l13 9M5.5 16.5l13-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M12 6.5 9.8 4.6M12 6.5l2.2-1.9M12 17.5l-2.2 1.9M12 17.5l2.2 1.9M7.4 9.2 5 9.7M7.4 9.2l.5-2.4M16.6 14.8l2.4-.5M16.6 14.8l-.5 2.4M7.4 14.8 5 14.3M7.4 14.8l.5 2.4M16.6 9.2l2.4.5M16.6 9.2l-.5-2.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 3.5 19.5 6.5v5.5c0 4.6-3 7.9-7.5 9.8C7.5 19.9 4.5 16.6 4.5 12V6.5L12 3.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="m8.8 12 2.3 2.3 4.4-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="8" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="6.2" cy="9.5" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.8" cy="9.5" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M7.6 19c.7-3 2.4-4.5 4.4-4.5s3.7 1.5 4.4 4.5M4 18.4c.4-2.1 1.5-3.1 2.9-3.1M20 18.4c-.4-2.1-1.5-3.1-2.9-3.1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 21s6-5.1 6-9.8a6 6 0 1 0-12 0C6 15.9 12 21 12 21Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="11.2" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const navIcons: Record<NavIcon, () => ReactElement> = {
  snowflake: SnowflakeIcon,
  shield: ShieldIcon,
  people: PeopleIcon,
  pin: PinIcon,
};

const scrollToSection = (targetId: string) => {
  const section = document.getElementById(targetId);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();
  const drawerRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // iOS WebKit: body style locks cancel fixed-layer animations.
  // Block background scroll with touchmove instead.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onTouchMove = (event: TouchEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(".header__drawer")) return;
      event.preventDefault();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [menuOpen]);

  // Web Animations API — commit to inline styles so iOS doesn't snap
  // back to the stylesheet `transform: translate3d(100%)` on cancel.
  useEffect(() => {
    if (!mounted) return;

    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? 1 : DRAWER_MS;
    const backdropDuration = Math.max(1, Math.round(duration * 0.85));
    const timers: number[] = [];

    const CLOSED = "translate3d(100%, 0, 0)";
    const OPEN = "translate3d(0, 0, 0)";

    const stopAnimations = (el: HTMLElement) => {
      el.getAnimations().forEach((animation) => animation.cancel());
    };

    const run = (
      el: HTMLElement,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
      commit: string,
      prop: "transform" | "opacity",
    ) => {
      stopAnimations(el);
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        if (prop === "transform") el.style.transform = commit;
        else el.style.opacity = commit;
        stopAnimations(el);
      };

      const animation = el.animate(keyframes, options);
      animation.onfinish = finish;
      // iOS can miss onfinish when the tab was backgrounded mid-gesture
      timers.push(
        window.setTimeout(finish, Number(options.duration ?? 0) + 48),
      );
    };

    if (menuOpen) {
      wasOpenRef.current = true;
      drawer.style.transform = CLOSED;
      backdrop.style.opacity = "0";
      void drawer.offsetWidth;

      run(
        drawer,
        [{ transform: CLOSED }, { transform: OPEN }],
        { duration, easing: DRAWER_EASE, fill: "forwards" },
        OPEN,
        "transform",
      );
      run(
        backdrop,
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: backdropDuration, easing: "ease", fill: "forwards" },
        "1",
        "opacity",
      );
    } else if (!wasOpenRef.current) {
      stopAnimations(drawer);
      stopAnimations(backdrop);
      drawer.style.transform = CLOSED;
      backdrop.style.opacity = "0";
    } else {
      wasOpenRef.current = false;
      drawer.style.transform = OPEN;
      backdrop.style.opacity = "1";
      void drawer.offsetWidth;

      run(
        drawer,
        [{ transform: OPEN }, { transform: CLOSED }],
        { duration, easing: DRAWER_EASE, fill: "forwards" },
        CLOSED,
        "transform",
      );
      run(
        backdrop,
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: backdropDuration, easing: "ease", fill: "forwards" },
        "0",
        "opacity",
      );
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [menuOpen, mounted]);

  const goTo = (targetId: string) => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => scrollToSection(targetId));
  };

  const renderNavLinks = (keyPrefix: string, withIcons = false) => (
    <ul className="header__list">
      {navigation.map((item) => {
        const Icon = navIcons[item.icon];

        return (
          <li key={`${keyPrefix}-${item.targetId}`} className="header__item">
            <button
              type="button"
              className="header__link"
              onClick={() => goTo(item.targetId)}
            >
              {withIcons ? (
                <span className="header__link-icon" aria-hidden="true">
                  <Icon />
                </span>
              ) : null}
              <span className="header__link-text">{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  const drawer =
    mounted &&
    createPortal(
      <>
        <button
          ref={backdropRef}
          type="button"
          className="header__backdrop"
          aria-label="Close menu"
          data-open={menuOpen ? "true" : "false"}
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />

        <nav
          ref={drawerRef}
          id={menuId}
          className="header__drawer"
          aria-label="Mobile primary"
          data-open={menuOpen ? "true" : "false"}
        >
          {renderNavLinks("drawer", true)}
          <div className="header__mobile-cta">
            <button
              type="button"
              className="header__cta"
              onClick={() => goTo("final-cta")}
            >
              Start My Cooling Plan
            </button>
          </div>
        </nav>
      </>,
      document.body,
    );

  return (
    <>
      <header className={cx("header", menuOpen && "header--menu-open")}>
        <Container>
          <div className="header__inner">
            <div className="header__brand">
              <Image
                className="header__symbol"
                src="/images/logos/logo-symbol.png"
                alt=""
                width={54}
                height={34}
                priority
                unoptimized
                aria-hidden="true"
              />

              <BrandLogo href="/" />

              <span className="header__divider" aria-hidden="true" />

              <div className="header__partner">
                <Image
                  className="header__partner-image"
                  src="/images/logos/logo-daikin.png"
                  alt="Daikin"
                  width={180}
                  height={48}
                  priority
                  unoptimized
                />
              </div>
            </div>

            <nav className="header__navigation" aria-label="Primary">
              {renderNavLinks("desktop")}
            </nav>

            <div className="header__actions">
              <button
                type="button"
                className="header__cta header__cta--desktop"
                onClick={() => goTo("final-cta")}
              >
                Start My Cooling Plan
              </button>

              <button
                type="button"
                className="header__menu-toggle"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="header__menu-bar" aria-hidden="true" />
                <span className="header__menu-bar" aria-hidden="true" />
                <span className="header__menu-bar" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {drawer}
    </>
  );
};

export default Header;
