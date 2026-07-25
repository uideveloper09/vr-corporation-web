import Image from "next/image";

import Container from "@/components/ui/Container";
import { showroomData } from "@/data/home/showroom";

import "./Showroom.css";

const Showroom = () => {
  const { number, eyebrow, titleLine1, titleLine2, description, image, cta } =
    showroomData;

  return (
    <section
      className="showroom"
      id="showroom"
      aria-labelledby="showroom-title"
    >
      <Container>
        <div className="showroom__inner">
          <header className="showroom__header">
            <span className="showroom__number" aria-hidden="true">
              {number}
            </span>

            <div className="showroom__intro">
              <p className="showroom__eyebrow">{eyebrow}</p>

              <h2 id="showroom-title" className="showroom__title">
                <span className="showroom__title-line">{titleLine1}</span>
                <span className="showroom__title-line">{titleLine2}</span>
              </h2>
            </div>
          </header>

          <div className="showroom__body">
            <div className="showroom__copy">
              <p className="showroom__description">{description}</p>

              <a className="showroom__cta" href={cta.href}>
                {cta.label}
              </a>
            </div>

            <div className="showroom__media">
              <Image
                className="showroom__image"
                src={image.src}
                alt={image.alt}
                width={960}
                height={640}
                unoptimized
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Showroom;
