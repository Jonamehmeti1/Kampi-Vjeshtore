"use client";

import { useEffect, useState } from "react";
import { camp } from "../content/camp";

// Scroll animations and the small-screen Apply button.
export default function PageEffects() {
  const [showMobileButton, setShowMobileButton] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const elements = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const heroObserver = new IntersectionObserver(([entry]) =>
      setShowMobileButton(!entry.isIntersecting),
    );
    if (hero) heroObserver.observe(hero);

    if (reduceMotion) return () => heroObserver.disconnect();

    document.documentElement.classList.add("js-anim");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    elements.forEach((element) => revealObserver.observe(element));
    return () => {
      heroObserver.disconnect();
      revealObserver.disconnect();
      document.documentElement.classList.remove("js-anim");
    };
  }, []);

  return (
    <div className={"sticky-mobile-cta" + (showMobileButton ? " visible" : "")}>
      <a href="#regjistrohu" className="btn btn-header-cta btn-block btn-fun">
        {camp.applyButton} →
      </a>
    </div>
  );
}
