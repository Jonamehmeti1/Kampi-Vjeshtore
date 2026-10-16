import { heroJourney } from "../content/hero-journey";
import styles from "../styles/hero-intro.module.css";

// Text stays editable; the transparent sprite sheet supplies only illustrations.
export default function HeroJourney() {
  return (
    <div className={styles.journey} aria-label="Tri ditët e kampit">
      <svg
        className={styles.journeyTrail}
        viewBox="0 0 760 500"
        fill="none"
        aria-hidden="true"
      >
        <path d="M100 367C-4 327 4 205 85 250S139 316 229 233 319 58 383 108 499 209 551 97 644 29 608 67 704 160 735 28M375 392C411 425 480 504 556 442S642 386 698 414" />
      </svg>

      <span className={styles.sparkOne} aria-hidden="true">
        ✧
      </span>
      <span className={styles.sparkTwo} aria-hidden="true">
        ✦
      </span>
      <span className={styles.sparkThree} aria-hidden="true">
        ✧
      </span>
      <span className={styles.illustration + " " + styles.rocket} aria-hidden="true" />
      <span className={styles.illustration + " " + styles.blocks} aria-hidden="true" />
      <span className={styles.illustration + " " + styles.gear} aria-hidden="true" />

      <div className={styles.dayCards}>
        {heroJourney.map((day) => (
          <article className={styles.dayCard + " " + styles[day.color]} key={day.day}>
            <span className={styles.dayBadge}>{day.day}</span>
            <span
              className={
                styles.illustration +
                " " +
                styles.dayIcon +
                " " +
                styles[day.illustration]
              }
              aria-hidden="true"
            />
            <h2 className={styles.dayTitle}>
              <span>{day.title}</span>
            </h2>
            <p className={styles.dayDescription}>{day.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
