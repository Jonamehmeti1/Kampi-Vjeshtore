"use client";

import { useState, type FormEvent } from "react";
import { ages, formText, schedules } from "../content/camp";
import { schoolsByLocation } from "../content/schools";

// One form component is reused twice, with unique field IDs for each copy.
// It currently validates locally and displays a demo message; no API is called.
export default function RegistrationForm({ variant }: { variant: "hero" | "lower" }) {
  const [school, setSchool] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const prefix = variant === "hero" ? "hero" : "join";
  const isOtherSchool = school === formText.otherSchool;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className={"hero-reg-card" + (variant === "lower" ? " join-form-card" : "")}
      id={variant === "hero" ? "rezervo" : "rezervo-oferta"}
    >
      <div className="hero-reg-head">
        <div>
          {variant === "hero" ? (
            <h2>{formText.heroTitle}</h2>
          ) : (
            <h3 className="join-form-title">{formText.lowerTitle}</h3>
          )}
          <p>
            {variant === "hero" ? formText.heroDescription : formText.lowerDescription}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {submitted && (
          <p className="form-message success" role="status">
            {formText.demoFeedback}
          </p>
        )}

        <div className="hero-reg-fields">
          <div className="form-group">
            <label htmlFor={prefix + "-parent"}>{formText.parentLabel}</label>
            <input
              id={prefix + "-parent"}
              name="parent_name"
              autoComplete="name"
              placeholder={formText.parentPlaceholder}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor={prefix + "-phone"}>{formText.phoneLabel}</label>
            <input
              id={prefix + "-phone"}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder={formText.phonePlaceholder}
              required
              maxLength={40}
            />
          </div>

          <div className="form-group">
            <label htmlFor={prefix + "-child"}>{formText.childLabel}</label>
            <input
              id={prefix + "-child"}
              name="child_name"
              autoComplete="off"
              placeholder={formText.childPlaceholder}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor={prefix + "-age"}>{formText.ageLabel}</label>
            <div className="hero-select">
              <select id={prefix + "-age"} name="child_age" defaultValue="" required>
                <option value="" disabled>
                  {formText.agePlaceholder}
                </option>
                {ages.map((age) => (
                  <option key={age} value={age}>
                    {age} {formText.ageSuffix}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group hero-reg-full">
            <label htmlFor={prefix + "-schedule"}>{formText.scheduleLabel}</label>
            <div className="hero-select">
              <select id={prefix + "-schedule"} name="schedule" defaultValue="" required>
                <option value="" disabled>
                  {formText.schedulePlaceholder}
                </option>
                {schedules.map((schedule) => (
                  <option key={schedule} value={schedule}>
                    {schedule}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group hero-reg-full">
            <label htmlFor={prefix + "-school"}>{formText.schoolLabel}</label>
            <div className="hero-select">
              <select
                id={prefix + "-school"}
                name="school"
                value={school}
                onChange={(event) => setSchool(event.target.value)}
                required
              >
                <option value="" disabled>
                  {formText.schoolPlaceholder}
                </option>
                {/* Keep school groups exactly as defined in content/schools.ts. */}
                {Object.entries(schoolsByLocation).map(([location, schools]) => (
                  <optgroup key={location} label={location}>
                    {schools.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value={formText.otherSchool}>{formText.otherSchool}</option>
              </select>
            </div>
          </div>

          {isOtherSchool && (
            <div className="form-group hero-reg-full">
              <label htmlFor={prefix + "-other-school"}>
                {formText.otherSchoolLabel}
              </label>
              <input
                id={prefix + "-other-school"}
                name="school_other"
                placeholder={formText.otherSchoolPlaceholder}
                required
                maxLength={150}
              />
            </div>
          )}
        </div>

        {variant === "hero" && (
          <p className="hero-reg-note">
            <span className="hero-reg-note-icon" aria-hidden="true">
              i
            </span>
            <span>{formText.scheduleNote}</span>
          </p>
        )}

        <button
          type="submit"
          className={
            "btn btn-camp btn-block" + (variant === "lower" ? " join-submit" : "")
          }
        >
          {formText.submitButton}
          <span aria-hidden="true">→</span>
        </button>
        <p className="hero-reg-foot">{formText.demoNote}</p>
      </form>
    </div>
  );
}
