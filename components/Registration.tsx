import { campFacts, registration } from "../content/camp";
import Icon, { type IconName } from "./Icon";
import RegistrationForm from "./RegistrationForm";

export default function Registration() {
  const facts: { icon: IconName; title: string; note: string }[] = [
    { icon: "calendar", title: campFacts.dates, note: registration.dateNote },
    { icon: "users", title: campFacts.ages, note: registration.ageNote },
    { icon: "gift", title: campFacts.price, note: registration.priceNote },
  ];

  return (
    <section className="section-form" id="regjistrohu">
      <div className="container">
        <div className="join-wrap" data-reveal="zoom">
          <div className="join-content">
            <p className="join-eyebrow">
              <span className="join-eyebrow-dot" aria-hidden="true" />
              {registration.eyebrow}
            </p>
            <h2 className="join-title">
              {registration.title}{" "}
              <span className="join-title-accent">{registration.highlightedTitle}</span>
            </h2>
            <p className="join-text">{registration.description}</p>

            <ul className="join-facts">
              {facts.map((fact) => (
                <li key={fact.icon}>
                  <span className="join-fact-icon" aria-hidden="true">
                    <Icon name={fact.icon} />
                  </span>
                  <span>
                    <strong>{fact.title}</strong>
                    {fact.note}
                  </span>
                </li>
              ))}
            </ul>
            <p className="join-note">
              <span aria-hidden="true">⏳</span>
              {registration.limitedPlaces}
            </p>
          </div>

          <RegistrationForm variant="lower" />
        </div>
      </div>
    </section>
  );
}
