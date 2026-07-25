"use client";

import { useEffect, useRef, useState } from "react";
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

const TrustedClients = ({
  data = trustedClientsData,
  id = "trusted-clients",
  className,
}: TrustedClientsProps) => {
  const { number, eyebrow, title, description, clients } = data;
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);
  const pageRef = useRef(0);
  const animatingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const loopClients = [...clients, ...clients];

  const getStep = () => {
    const track = trackRef.current;
    if (!track) return 0;
    return track.scrollWidth / 2 / PAGE_COUNT;
  };

  const applyOffset = (offset: number, withTransition: boolean) => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = withTransition
      ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  };

  const goToPage = (target: number, withTransition = true) => {
    const track = trackRef.current;
    if (!track || animatingRef.current) return;

    const step = getStep();
    if (step <= 0) return;

    const current = pageRef.current;
    let next = target;

    // Normalize into -1 .. PAGE_COUNT range for wrap detection
    if (target < 0) next = -1;
    if (target >= PAGE_COUNT) next = PAGE_COUNT;

    const wrapForward = next === PAGE_COUNT;
    const wrapBackward = next === -1;
    const normalized =
      ((target % PAGE_COUNT) + PAGE_COUNT) % PAGE_COUNT;

    pageRef.current = normalized;
    setPage(normalized);

    if (!withTransition) {
      applyOffset(normalized * step, false);
      return;
    }

    animatingRef.current = true;

    if (wrapForward) {
      applyOffset(PAGE_COUNT * step, true);
      window.setTimeout(() => {
        applyOffset(0, false);
        animatingRef.current = false;
      }, 680);
      return;
    }

    if (wrapBackward) {
      applyOffset(PAGE_COUNT * step, false);
      void track.offsetWidth;
      applyOffset((PAGE_COUNT - 1) * step, true);
      window.setTimeout(() => {
        animatingRef.current = false;
      }, 680);
      return;
    }

    void current;
    applyOffset(normalized * step, true);
    window.setTimeout(() => {
      animatingRef.current = false;
    }, 680);
  };

  useEffect(() => {
    const sync = () => goToPage(pageRef.current, false);
    // Wait a frame so layout/images measure correctly
    const id = window.requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("resize", sync);
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
      goToPage(pageRef.current + 1, true);
    }, AUTO_MS);

    return () => {
      if (timerRef.current != null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

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
              onClick={() => goToPage(pageRef.current - 1, true)}
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

            <div className="trusted-clients__viewport">
              <ul ref={trackRef} className="trusted-clients__list">
                {loopClients.map((client, index) => (
                  <li
                    key={`${client.id}-${index}`}
                    className="trusted-clients__item"
                    aria-hidden={index >= clients.length}
                  >
                    <div className="trusted-clients__logo">
                      <Image
                        src={client.logo}
                        alt={
                          index < clients.length ? `${client.name} logo` : ""
                        }
                        width={160}
                        height={92}
                        unoptimized
                      />
                    </div>
                    <p className="trusted-clients__name">{client.name}</p>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="trusted-clients__nav trusted-clients__nav--next"
              onClick={() => goToPage(pageRef.current + 1, true)}
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
                onClick={() => goToPage(index, true)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustedClients;
