"use client";

import { useEffect, useId, useRef, useState } from "react";

import { siteConfig } from "@/data/site";
import { cx } from "@/lib/cx";

import "./ServiceAreaMap.css";

export type ServiceAreaMapProps = {
  title?: string;
  className?: string;
};

const LAT = siteConfig.geo.latitude;
const LNG = siteConfig.geo.longitude;
const ZOOM = 17;

function buildEmbedSrc() {
  // Centered map without Google Place pin (avoids "Place info couldn't load").
  // Our red marker handles the click → address card.
  return `https://maps.google.com/maps?ll=${LAT},${LNG}&z=${ZOOM}&hl=en&output=embed`;
}

const LocationPinIcon = () => (
  <svg viewBox="0 0 40 56" aria-hidden="true" focusable="false">
    <path
      d="M20 0C8.95 0 0 8.95 0 20c0 14.5 20 36 20 36s20-21.5 20-36C40 8.95 31.05 0 20 0Z"
      fill="#e53935"
    />
    <circle cx="20" cy="20" r="7.5" fill="#ffffff" />
  </svg>
);

const ServiceAreaMap = ({
  title = "Google Map of V R Corporation showroom in Kharkhoda",
  className,
}: ServiceAreaMapProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardId = useId();

  const name = siteConfig.name;
  const partner = siteConfig.partnerLine;
  const address = siteConfig.address.formatted;
  const hours = `Open ${siteConfig.hours.display}`;
  const mapsHref = siteConfig.hasMap;
  const coords = `${LAT}, ${LNG}`;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const root = rootRef.current;
      const target = event.target;
      if (!(root && target instanceof Node)) return;
      if (!root.contains(target)) {
        setOpen(false);
        return;
      }

      const card = root.querySelector(".service-area-map__card");
      const pin = root.querySelector(".service-area-map__pin");
      if (
        card instanceof Node &&
        pin instanceof Node &&
        !card.contains(target) &&
        !pin.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cx("service-area-map", className)}>
      <iframe
        className="service-area-map__frame"
        title={title}
        src={buildEmbedSrc()}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      <button
        type="button"
        className={cx(
          "service-area-map__pin",
          open && "service-area-map__pin--active",
        )}
        aria-label={`${name} location details`}
        aria-expanded={open}
        aria-controls={cardId}
        onClick={() => setOpen((value) => !value)}
      >
        <LocationPinIcon />
      </button>

      <aside
        id={cardId}
        className={cx(
          "service-area-map__card",
          open && "service-area-map__card--open",
        )}
        aria-label={`${name} location`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <button
          type="button"
          className="service-area-map__close"
          aria-label="Close location details"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <p className="service-area-map__name">{name}</p>
        <p className="service-area-map__partner">{partner}</p>
        <p className="service-area-map__address">{address}</p>
        <p className="service-area-map__hours">{hours}</p>
        <p className="service-area-map__coords">
          <span className="service-area-map__coords-label">
            Kharkhoda Coordinates
          </span>
          <a
            className="service-area-map__coords-link"
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {coords}
          </a>
        </p>
        <a
          className="service-area-map__open"
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </a>
      </aside>
    </div>
  );
};

export default ServiceAreaMap;
