import type { ReactNode } from "react";

import "./Section.css";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "dark" | "light";
}

const Section = ({
  children,
  className,
  id,
  background = "default",
}: SectionProps) => {
  const classNames = [
    "section",
    `section--${background}`,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classNames}>
      {children}
    </section>
  );
};

export default Section;
