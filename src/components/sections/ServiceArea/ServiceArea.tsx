import Image from "next/image";

import Container from "@/components/ui/Container";
import { serviceAreaData } from "@/data/home/serviceArea";
import { cx } from "@/lib/cx";

import "./ServiceArea.css";

export type ServiceAreaData = typeof serviceAreaData;

export type ServiceAreaProps = {
  data?: ServiceAreaData;
  id?: string;
  className?: string;
};

const ChipPinIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path
      d="M8 14.5S12.5 11 12.5 7a4.5 4.5 0 1 0-9 0c0 4 4.5 7.5 4.5 7.5Z"
      fill="#1d67cd"
    />
    <circle cx="8" cy="7" r="1.6" fill="#ffffff" />
  </svg>
);

const ServiceArea = ({
  data = serviceAreaData,
  id = "service-area",
  className,
}: ServiceAreaProps) => {
  const { number, title, description, locations, map } = data;

  return (
    <section
      className={cx("service-area", className)}
      id={id}
      aria-labelledby="service-area-title"
    >
      <Container>
        <div className="service-area__panel">
          <div className="service-area__map">
            <Image
              className="service-area__map-image"
              src={map.src}
              alt={map.alt}
              width={map.width}
              height={map.height}
              sizes="(max-width: 860px) 100vw, 55vw"
              priority={false}
            />
          </div>

          <div className="service-area__content">
            <div className="service-area__heading">
              <span className="service-area__number" aria-hidden="true">
                {number}
              </span>

              <h2 id="service-area-title" className="service-area__title">
                {title}
              </h2>
            </div>

            <p className="service-area__description">{description}</p>

            <ul className="service-area__chips">
              {locations.map((location) => (
                <li key={location} className="service-area__chip">
                  <span className="service-area__chip-icon" aria-hidden="true">
                    <ChipPinIcon />
                  </span>
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceArea;
