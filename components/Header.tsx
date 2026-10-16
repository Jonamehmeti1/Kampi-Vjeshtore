"use client";

import { useEffect, useState } from "react";
import { camp } from "../content/camp";

// The header becomes white after scrolling past the hero.
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function updateHeader() {
      const hero = document.getElementById("hero");
      const header = document.querySelector("header");
      const mobile = window.matchMedia("(max-width: 767px)").matches;

      if (mobile || !hero) {
        setScrolled(window.scrollY > 10);
      } else {
        setScrolled(
          hero.getBoundingClientRect().bottom <= (header?.clientHeight ?? 80) + 12,
        );
      }
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  return (
    <header
      className={"site-header site-header-mockup" + (scrolled ? " is-scrolled" : "")}
    >
      <div className="header-inner">
        <a href="#hero" className="logo-wrap" aria-label={camp.organizer}>
          <img
            src={camp.headerLogo}
            className="logo-img"
            alt={camp.organizer}
            width={1476}
            height={768}
          />
        </a>
        <div className="header-right">
          <a href="#regjistrohu" className="btn btn-header-cta">
            {camp.applyButton} →
          </a>
        </div>
      </div>
    </header>
  );
}
