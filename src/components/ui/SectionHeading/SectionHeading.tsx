import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** BEM block name, e.g. `why-vr` → `why-vr__header` */
  prefix: string;
  titleId: string;
  title: ReactNode;
  number?: string;
  eyebrow?: string;
  description?: ReactNode;
  /** Optional action (e.g. section CTA link), rendered after intro */
  action?: ReactNode;
  /** Wrap title/eyebrow/description in `__intro` (default true) */
  withIntro?: boolean;
  className?: string;
};

const SectionHeading = ({
  prefix,
  titleId,
  title,
  number,
  eyebrow,
  description,
  action,
  withIntro = true,
  className,
}: SectionHeadingProps) => {
  const headerClass = [`${prefix}__header`, className].filter(Boolean).join(" ");

  const titleEl = (
    <h2 id={titleId} className={`${prefix}__title`}>
      {title}
    </h2>
  );

  const body = withIntro ? (
    <div className={`${prefix}__intro`}>
      {eyebrow ? <p className={`${prefix}__eyebrow`}>{eyebrow}</p> : null}
      {titleEl}
      {description ? (
        <p className={`${prefix}__description`}>{description}</p>
      ) : null}
      {action}
    </div>
  ) : (
    <>
      {eyebrow ? <p className={`${prefix}__eyebrow`}>{eyebrow}</p> : null}
      {titleEl}
      {description ? (
        <p className={`${prefix}__description`}>{description}</p>
      ) : null}
      {action}
    </>
  );

  return (
    <header className={headerClass}>
      {number ? (
        <span className={`${prefix}__number`} aria-hidden="true">
          {number}
        </span>
      ) : null}
      {body}
    </header>
  );
};

export default SectionHeading;
