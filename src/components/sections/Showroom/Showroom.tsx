import Image from "next/image";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { showroomData } from "@/data/home/showroom";
import { cx } from "@/lib/cx";

import "./Showroom.css";

export type ShowroomData = typeof showroomData;

export type ShowroomProps = {
  data?: ShowroomData;
  id?: string;
  className?: string;
};

const Showroom = ({
  data = showroomData,
  id = "showroom",
  className,
}: ShowroomProps) => {
  const { number, eyebrow, titleLine1, titleLine2, description, image, cta } =
    data;

  return (
    <section
      className={cx("showroom", className)}
      id={id}
      aria-labelledby="showroom-title"
    >
      <Container>
        <div className="showroom__inner">
          <SectionHeading
            prefix="showroom"
            titleId="showroom-title"
            number={number}
            eyebrow={eyebrow}
            title={
              <>
                <span className="showroom__title-line">{titleLine1}</span>
                <span className="showroom__title-line">{titleLine2}</span>
              </>
            }
          />

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
