// Decorative cutouts, autumn leaves, and STEM doodles for the registration panel.
export default function RegistrationDecorations() {
  return (
    <>
      <div className="join-decorations" aria-hidden="true">
        <svg className="join-waves" viewBox="0 0 1200 650" preserveAspectRatio="none">
          <path d="M0 330C110 280 170 550 350 650H0Z" fill="var(--brand-forest)" />
          <path d="M0 500C180 525 145 675 410 650H0Z" fill="var(--brand-lime)" />
          <path
            d="M1200 185C1120 145 1110 300 1040 300S1015 430 900 460 850 590 660 650H1200Z"
            fill="var(--brand-forest)"
          />
          <path
            d="M560 650C740 545 890 620 980 550s110-30 220-105v205Z"
            fill="var(--brand-lime)"
            opacity=".8"
          />
        </svg>
        {["top", "left", "bottom", "right"].map((position) => (
          <svg
            className={"join-leaf join-leaf--" + position}
            viewBox="0 0 80 100"
            key={position}
          >
            <path
              d="M37 82C15 79 6 64 5 51l18 6C5 39 5 25 8 14l23 15C25 14 30 6 35 1c10 7 15 19 13 32l21-13c0 18-4 30-16 38l20-3c-2 16-14 25-31 28Z"
              fill="currentColor"
            />
            <path
              d="m35 18 5 65 10 15M18 37l20 22 19-21M17 63l23 12 17-10"
              fill="none"
              stroke="var(--brand-orange-dark)"
              strokeWidth="1.5"
              opacity=".5"
            />
          </svg>
        ))}
        <span className="join-rocket" />
        <svg
          className="join-flight"
          viewBox="0 0 310 100"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M10 78C47 8 111 6 153 64s83 18 109-8"
            stroke="var(--brand-forest)"
            strokeWidth="1.7"
            strokeDasharray="4 8"
          />
          <path
            d="m251 35 51-18-27 39-9-10-8 9 1-16 43-22-36 29"
            stroke="var(--brand-forest)"
            strokeWidth="2"
          />
        </svg>
        <svg
          className="join-spark join-spark--one"
          viewBox="0 0 28 28"
          fill="none"
          stroke="var(--brand-gold)"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="m14 3-2 22M3 12l22 4M5 24 17 7" />
        </svg>
        <svg
          className="join-spark join-spark--two"
          viewBox="0 0 28 28"
          fill="none"
          stroke="var(--brand-gold)"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M14 4v20M4 14h20" />
        </svg>
      </div>
      <div className="join-art" aria-hidden="true">
        <img
          src="/images/registration-child.png"
          alt=""
          loading="lazy"
          width="1145"
          height="1374"
        />
      </div>
    </>
  );
}
