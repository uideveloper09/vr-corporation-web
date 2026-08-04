"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

import { cx } from "@/lib/cx";

import "./Reveal.css";

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  /** Animate as soon as splash ends (hero / above-the-fold) */
  eager?: boolean;
  once?: boolean;
};

const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  className,
  eager = false,
  once = true,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    if (!eager) return;

    const show = () => setVisible(true);
    const ready = document.documentElement.dataset.appReady === "true";

    if (ready) {
      if (delay <= 0) {
        show();
        return;
      }
      const id = window.setTimeout(show, delay);
      return () => window.clearTimeout(id);
    }

    const onReady = () => {
      window.setTimeout(show, delay);
    };
    window.addEventListener("vr:app-ready", onReady, { once: true });
    const poll = window.setInterval(() => {
      if (document.documentElement.dataset.appReady === "true") {
        window.clearInterval(poll);
        onReady();
      }
    }, 80);

    return () => {
      window.removeEventListener("vr:app-ready", onReady);
      window.clearInterval(poll);
    };
  }, [delay, eager]);

  useEffect(() => {
    if (eager) return;

    const node = ref.current;
    if (!node) return;

    const show = () => setVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        show();
        if (once) observer.disconnect();
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, once]);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cx(
        "reveal",
        `reveal--${variant}`,
        visible && "reveal--in",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default Reveal;
