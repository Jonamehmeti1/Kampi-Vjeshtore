import { programs, programsSection } from "../content/camp";

// The copy, features, button labels, and illustration positions live in content/camp.ts.
function ChildIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 14C5 6 12 3 16 4c6-1 11 4 10 10M7 13l5-3 4 3 4-3 5 3M7 14c-5-1-5 6 0 6 2 10 16 10 18 0 5 0 5-7 0-6" />
      <path d="M12 17h.01M20 17h.01M12 22q4 3 8 0" />
    </svg>
  );
}

function ProgramDecorations() {
  return (
    <div className="groups-decorations" aria-hidden="true">
      <svg
        className="groups-flight groups-flight--left"
        viewBox="0 0 180 150"
        fill="none"
      >
        <path
          d="M20 145C5 75 35 36 82 68s62 15 82-12"
          stroke="var(--brand-lime)"
          strokeWidth="4"
          strokeDasharray="9 12"
          strokeLinecap="round"
        />
        <path
          d="m105 7 4 13 14 3-12 8-2 14-7-12-14-3 12-8Z"
          stroke="var(--brand-orange)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="groups-flight groups-flight--plane"
        viewBox="0 0 200 130"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M7 115c30-53 61-12 89-20 16-4 20-17 28-23"
          stroke="var(--brand-gold)"
          strokeWidth="3"
          strokeDasharray="9 11"
        />
        <path
          d="m126 54 55-17-28 43-11-12-9 10 1-20 47-21-39 31"
          stroke="var(--brand-orange)"
          strokeWidth="3"
        />
      </svg>
      <svg className="groups-bottom-trail" viewBox="0 0 720 80" fill="none">
        <path
          d="M40 20c85 92 146 8 209 22s66 43 103 25"
          stroke="var(--brand-lime)"
          strokeWidth="4"
          strokeDasharray="10 12"
          strokeLinecap="round"
        />
        <path
          d="m690 12 4 10 11 4-10 5-4 11-4-11-10-4 10-4Z"
          stroke="var(--brand-orange)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="groups-gear" />
    </div>
  );
}

export default function Programs() {
  return (
    <section className="section-groups" id="programet" aria-labelledby="programs-title">
      <ProgramDecorations />
      <div className="container">
        <div className="groups-head" data-reveal>
          <h2 className="groups-title" id="programs-title">
            {programsSection.title}
            <span className="groups-title-sparks" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </h2>
          <p className="groups-note">{programsSection.description}</p>
        </div>

        <div className="groups-grid">
          {programs.map((program) => (
            <article
              className={"group-card group-card--" + program.color}
              key={program.ages}
              data-reveal
            >
              <span className="group-age">
                <ChildIcon />
                {program.ages}
                <span className="group-age-rays" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </span>
              <h3 className="group-title">
                {program.title}
                {program.subtitle && <span>&amp; {program.subtitle}</span>}
              </h3>
              <div className="group-descriptions">
                {program.descriptions.map((description, index) => (
                  <div className="group-description" key={description.title || index}>
                    {description.title && <h4>{description.title}</h4>}
                    <p className="group-text">{description.text}</p>
                  </div>
                ))}
              </div>
              <ul className="group-features">
                {program.features.map((feature) => (
                  <li key={feature}>
                    <span className="group-check" aria-hidden="true">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="group-card-footer">
                <a
                  className="group-button"
                  href="#regjistrohu"
                  aria-label={
                    program.buttonLabel +
                    ": " +
                    program.title +
                    (program.subtitle ? " & " + program.subtitle : "")
                  }
                >
                  {program.buttonLabel}
                  <span aria-hidden="true">→</span>
                </a>
                <div
                  className={"group-media group-media--" + program.artwork}
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
