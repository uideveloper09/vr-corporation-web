import Image from "next/image";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { coolingPlanData } from "@/data/home/coolingPlan";
import { cx } from "@/lib/cx";

import "./CoolingPlan.css";

export type CoolingPlanData = typeof coolingPlanData;

export type CoolingPlanProps = {
  data?: CoolingPlanData;
  id?: string;
  className?: string;
};

const FLOW_ARROW_SRC = "/images/brand/04/flow-arrow.png";

const CoolingPlan = ({
  data = coolingPlanData,
  id = "services",
  className,
}: CoolingPlanProps) => {
  const { number, eyebrow, title, description, steps, cta } = data;

  const flowItems = steps.flatMap((step, index) => {
    const card = (
      <article key={step.id} className="cooling-plan__card">
        <span className="cooling-plan__badge" aria-hidden="true">
          {step.step}
        </span>

        <div className="cooling-plan__card-media">
          <Image
            className="cooling-plan__card-image"
            src={step.image}
            alt={step.imageAlt}
            width={240}
            height={160}
            unoptimized
          />
        </div>

        <h3 className="cooling-plan__card-title">{step.title}</h3>
        <p className="cooling-plan__card-description">{step.description}</p>
      </article>
    );

    if (index >= steps.length - 1) {
      return [card];
    }

    const arrow = (
      <div
        key={`arrow-${step.id}`}
        className="cooling-plan__arrow"
        aria-hidden="true"
      >
        <img
          className="cooling-plan__arrow-image"
          src={FLOW_ARROW_SRC}
          alt=""
          width={40}
          height={24}
        />
      </div>
    );

    return [card, arrow];
  });

  return (
    <section
      className={cx("cooling-plan", className)}
      id={id}
      aria-labelledby="cooling-plan-title"
    >
      <Container>
        <div className="cooling-plan__inner">
          <SectionHeading
            prefix="cooling-plan"
            titleId="cooling-plan-title"
            number={number}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <div className="cooling-plan__panel">
            {flowItems}

            <a className="cooling-plan__cta-card" href={cta.href}>
              <span className="cooling-plan__cta-media">
                <Image
                  className="cooling-plan__cta-image"
                  src={cta.image}
                  alt=""
                  width={120}
                  height={72}
                  unoptimized
                />
              </span>

              <span className="cooling-plan__cta-button">
                {cta.labelLines.map((line) => (
                  <span key={line} className="cooling-plan__cta-line">
                    {line}
                  </span>
                ))}
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CoolingPlan;
