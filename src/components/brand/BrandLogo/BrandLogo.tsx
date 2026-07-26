import Image from "next/image";

import "./BrandLogo.css";

type BrandLogoProps = {
  className?: string;
  href?: string;
};

const BrandLogo = ({ className = "", href }: BrandLogoProps) => {
  const content = (
    <Image
      className="brand-logo__image"
      src="/images/logos/logo-vrcorporation-light.png"
      alt="V R Corporation — Daikin Authorized Partner"
      width={320}
      height={72}
      priority
      unoptimized
    />
  );

  const classes = ["brand-logo", className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a className={classes} href={href} aria-label="V R Corporation home">
        {content}
      </a>
    );
  }

  return <div className={classes}>{content}</div>;
};

export default BrandLogo;
