import { campFacts, registration } from "../content/camp";
import Icon, { type IconName } from "./Icon";
import RegistrationForm from "./RegistrationForm";
import RegistrationDecorations from "./RegistrationDecorations";

export default function Registration() {
  const facts: { icon: IconName; title: string; note: string }[] = [
    { icon: "calendar", title: campFacts.dates, note: registration.dateNote },
    { icon: "users", title: campFacts.ages, note: registration.ageNote },
    { icon: "gift", title: campFacts.price, note: registration.priceNote },
  ];

  return (
    <section
      className="section-form"
      id="regjistrohu"
      aria-labelledby="registration-title"
    >
      <div className="container">
        <div className="join-wrap">
          <RegistrationDecorations />
          <RegistrationForm variant="lower" />
          <div className="join-content">
            <p className="join-eyebrow">
              <span className="join-eyebrow-dot" aria-hidden="true" />
              {registration.eyebrow}
            </p>
            <h2 className="join-title" id="registration-title">
              {registration.title}
              <span className="join-title-line">
                {registration.preposition}{" "}
                <span className="join-title-accent">{registration.highlightedTitle}</span>
              </span>
            </h2>
            <p className="join-text">{registration.description}</p>
            <ul className="join-facts">
              {facts.map((fact) => (
                <li key={fact.icon}>
                  <span className="join-fact-icon" aria-hidden="true">
                    <Icon name={fact.icon} />
                  </span>
                  <strong>{fact.title}</strong>
                  <span>{fact.note}</span>
                </li>
              ))}
            </ul>
            <div className="join-note">
              <span className="join-note-icon" aria-hidden="true">
                ⌛
              </span>
              <p>
                {registration.limitedPlaces}
                <strong>{registration.limitedPlacesAction}</strong>
              </p>
              <span className="join-note-rays" aria-hidden="true">
                ✦
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
