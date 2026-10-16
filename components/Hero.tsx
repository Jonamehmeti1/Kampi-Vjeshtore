import { campFacts, hero } from "../content/camp";
import Icon, { type IconName } from "./Icon";
import HeroJourney from "./HeroJourney";
import styles from "../styles/hero-intro.module.css";

// Centered heading above the illustrated journey and camp information.
export default function Hero() {
  const facts: { icon: IconName; text: string }[] = [
    { icon: "calendar", text: campFacts.dates },
    { icon: "users", text: campFacts.ages },
    { icon: "clock", text: campFacts.duration },
    { icon: "gift", text: campFacts.price },
  ];

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.background}>
        <img
          className={styles.backgroundImage}
          src={hero.image}
          alt={hero.imageAlt}
          loading="eager"
          fetchPriority="high"
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Icon name="sparkles" />
            </span>
            {hero.badge}
            <span className={styles.badgeLeaf}>
              <Icon name="leaf" />
            </span>
          </p>

          <h1 className={styles.title}>
            <span className={styles.titleMain}>
              {hero.title}{" "}
              <span className={styles.titleAccent}>{hero.highlightedTitle}</span>
              <span className={styles.titleSparks} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </span>
            <span className={styles.subtitle}>{hero.subtitle}</span>
          </h1>
        </div>

        <div className={styles.body}>
          <HeroJourney />

          <div className={styles.copy}>
            <p className={styles.lead}>{hero.lead}</p>
            <p className={styles.description}>{hero.description}</p>
            <ul className={styles.facts}>
              {facts.map((fact) => (
                <li key={fact.icon}>
                  <Icon name={fact.icon} />
                  {fact.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
