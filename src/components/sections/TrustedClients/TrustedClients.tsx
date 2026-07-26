"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { trustedClientsData } from "@/data/home/trustedClients";
import { cx } from "@/lib/cx";

import "./TrustedClients.css";

export type TrustedClientsData = typeof trustedClientsData;

export type TrustedClientsProps = {
  data?: TrustedClientsData;
  id?: string;
  className?: string;
};

const PAGE_COUNT = 3;
const AUTO_MS = 4000;
const SLIDE_MS = 650;
const SLIDE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SWIPE_THRESHOLD = 40;

const TrustedClients = ({
  data = trustedClientsData,
  id = "trusted-clients",
  className,
}: TrustedClientsProps) => {
  const { number, eyebrow, title, description, clients } = data;
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeClientId, setActiveClientId] = useState<string | null>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const animatingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const offsetRef = useRef(0);

  const loopClients = [...clients, ...clients];

  const getStep = () => {
    const track = trackRef.current;
    if (!track) return 0;

    // Half track = one full logo set (list is duplicated for looping)
    const half = track.scrollWidth / 2;
    if (half > 0) return half / PAGE_COUNT;

    // iOS can report 0 before images layout — temporary fallback
    return viewportRef.current?.clientWidth ?? 0;
  };

  const readOffset = () => {
    const track = trackRef.current;
    if (!track) return offsetRef.current;

    const raw = getComputedStyle(track).transform;
    const matrix = new DOMMatrixReadOnly(
      raw === "none" ? "matrix(1,0,0,1,0,0)" : raw,
    );
    return matrix.m41;
  };

  const applyOffset = (offset: number, withTransition: boolean) => {
    const track = trackRef.current;
    if (!track) return Promise.resolve();

    const toX = -offset;
    const fromX = readOffset();

    track.getAnimations().forEach((animation) => animation.cancel());
    track.style.transition = "none";

    if (!withTransition || Math.abs(fromX - toX) < 0.5) {
      track.style.transform = `translate3d(${toX}px, 0, 0)`;
      offsetRef.current = toX;
      return Promise.resolve();
    }

    track.style.transform = `translate3d(${fromX}px, 0, 0)`;
    void track.offsetWidth;

    return new Promise<void>((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        track.style.transform = `translate3d(${toX}px, 0, 0)`;
        offsetRef.current = toX;
        track.getAnimations().forEach((animation) => animation.cancel());
        resolve();
      };

      const animation = track.animate(
        [
          { transform: `translate3d(${fromX}px, 0, 0)` },
          { transform: `translate3d(${toX}px, 0, 0)` },
        ],
        {
          duration: SLIDE_MS,
          easing: SLIDE_EASE,
          fill: "forwards",
        },
      );
      animation.onfinish = finish;
      window.setTimeout(finish, SLIDE_MS + 48);
    });
  };

  const goToPage = async (target: number, withTransition = true) => {
    const track = trackRef.current;
    if (!track || animatingRef.current) return;

    const step = getStep();
    if (step <= 0) return;

    let next = target;
    if (target < 0) next = -1;
    if (target >= PAGE_COUNT) next = PAGE_COUNT;

    const wrapForward = next === PAGE_COUNT;
    const wrapBackward = next === -1;
    const normalized = ((target % PAGE_COUNT) + PAGE_COUNT) % PAGE_COUNT;

    pageRef.current = normalized;
    setPage(normalized);

    if (!withTransition) {
      await applyOffset(normalized * step, false);
      return;
    }

    animatingRef.current = true;

    try {
      if (wrapForward) {
        await applyOffset(PAGE_COUNT * step, true);
        await applyOffset(0, false);
        return;
      }

      if (wrapBackward) {
        await applyOffset(PAGE_COUNT * step, false);
        await applyOffset((PAGE_COUNT - 1) * step, true);
        return;
      }

      await applyOffset(normalized * step, true);
    } finally {
      animatingRef.current = false;
    }
  };

  useEffect(() => {
    const sync = () => {
      void goToPage(pageRef.current, false);
    };
    const frame = window.requestAnimationFrame(() => {
      sync();
      // Second pass after images/fonts settle (important on iOS)
      window.setTimeout(sync, 120);
      window.setTimeout(sync, 400);
    });

    const track = trackRef.current;
    const images = track?.querySelectorAll("img") ?? [];
    const onImageLoad = () => sync();
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImageLoad);
    });

    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
      images.forEach((img) => img.removeEventListener("load", onImageLoad));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (paused) {
      if (timerRef.current != null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      void goToPage(pageRef.current + 1, true);
    }, AUTO_MS);

    return () => {
      if (timerRef.current != null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
    setPaused(true);
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    setPaused(false);

    if (startX == null || endX == null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;

    if (delta < 0) void goToPage(pageRef.current + 1, true);
    else void goToPage(pageRef.current - 1, true);
  };

  return (
    <section
      className={cx("trusted-clients", className)}
      id={id}
      aria-labelledby="trusted-clients-title"
    >
      <Container>
        <div className="trusted-clients__inner">
          <SectionHeading
            prefix="trusted-clients"
            titleId="trusted-clients-title"
            number={number}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <div
            className="trusted-clients__carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button
              type="button"
              className="trusted-clients__nav trusted-clients__nav--prev"
              onClick={() => void goToPage(pageRef.current - 1, true)}
              aria-label="Previous clients"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="M10 3.5 5.5 8 10 12.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              ref={viewportRef}
              className="trusted-clients__viewport"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <ul ref={trackRef} className="trusted-clients__list">
                {loopClients.map((client, index) => {
                  const isReplica = index >= clients.length;
                  const isActive = !isReplica && activeClientId === client.id;

                  return (
                    <li
                      key={`${client.id}-${index}`}
                      className={cx(
                        "trusted-clients__item",
                        isActive && "trusted-clients__item--active",
                      )}
                      aria-hidden={isReplica}
                    >
                      <button
                        type="button"
                        className="trusted-clients__card"
                        tabIndex={isReplica ? -1 : 0}
                        aria-expanded={isActive}
                        aria-label={`${client.name}. ${client.about}`}
                        onClick={() => {
                          if (isReplica) return;
                          setActiveClientId((current) =>
                            current === client.id ? null : client.id,
                          );
                          setPaused(true);
                        }}
                        onMouseEnter={() => {
                          if (isReplica) return;
                          setActiveClientId(client.id);
                          setPaused(true);
                        }}
                        onMouseLeave={() => {
                          if (isReplica) return;
                          setActiveClientId(null);
                          setPaused(false);
                        }}
                        onFocus={() => {
                          if (isReplica) return;
                          setActiveClientId(client.id);
                          setPaused(true);
                        }}
                        onBlur={() => {
                          if (isReplica) return;
                          setActiveClientId(null);
                          setPaused(false);
                        }}
                      >
                        <div className="trusted-clients__logo">
                          <Image
                            className="trusted-clients__logo-image"
                            src={client.logo}
                            alt=""
                            width={160}
                            height={92}
                            unoptimized
                          />
                        </div>
                        <p className="trusted-clients__name">{client.name}</p>
                        <p className="trusted-clients__about">{client.about}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              type="button"
              className="trusted-clients__nav trusted-clients__nav--next"
              onClick={() => void goToPage(pageRef.current + 1, true)}
              aria-label="Next clients"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="M6 3.5 10.5 8 6 12.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            className="trusted-clients__dots"
            role="tablist"
            aria-label="Client pages"
          >
            {Array.from({ length: PAGE_COUNT }).map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={page === index}
                aria-label={`Go to page ${index + 1}`}
                className={
                  page === index
                    ? "trusted-clients__dot trusted-clients__dot--active"
                    : "trusted-clients__dot"
                }
                onClick={() => void goToPage(index, true)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustedClients;
