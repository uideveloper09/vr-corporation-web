"use client";

import Image from "next/image";

import BrandLogo from "@/components/brand/BrandLogo";
import Container from "@/components/ui/Container";
import { navigation } from "@/data/navigation";

import "./Header.css";

const scrollToSection = (targetId: string) => {
  const section = document.getElementById(targetId);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__inner">
          <div className="header__brand">
            <Image
              className="header__symbol"
              src="/images/logos/logo-symbol.png"
              alt=""
              width={54}
              height={34}
              priority
              unoptimized
              aria-hidden="true"
            />

            <BrandLogo href="/" />

            <span className="header__divider" aria-hidden="true" />

            <div className="header__partner">
              <Image
                className="header__partner-image"
                src="/images/logos/logo-daikin.png"
                alt="Daikin"
                width={180}
                height={48}
                priority
                unoptimized
              />
            </div>
          </div>

          <nav className="header__navigation" aria-label="Primary">
            <ul className="header__list">
              {navigation.map((item) => (
                <li key={item.targetId} className="header__item">
                  <button
                    type="button"
                    className="header__link"
                    onClick={() => scrollToSection(item.targetId)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="header__cta"
              onClick={() => scrollToSection("final-cta")}
            >
              Start My Cooling Plan
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
