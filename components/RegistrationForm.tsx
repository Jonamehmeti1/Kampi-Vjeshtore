"use client";

import { useState, type FormEvent } from "react";
import { ages, formText, schedules } from "../content/camp";
import { schoolsByLocation } from "../content/schools";
import RegistrationFieldIcon from "./RegistrationFieldIcon";

// Each form variant uses unique field IDs.
// Both variants save registrations through the server endpoint.
export default function RegistrationForm({ variant }: { variant: "hero" | "lower" }) {
  const [school, setSchool] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const prefix = variant === "hero" ? "hero" : "join";
  const isOtherSchool = school === formText.otherSchool;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    setPending(true);
    setSubmitted(false);
    setError(false);
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok || !(await response.json()).ok) throw new Error();
      setSubmitted(true);
      form.reset();
      setSchool("");
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
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
          {variant === "hero" && <p>{formText.heroDescription}</p>}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        aria-label={variant === "hero" ? formText.heroTitle : formText.lowerTitle}
      >
        {submitted && (
          <p className="form-message success" role="status">
            {formText.successFeedback}
          </p>
        )}

        {error && (
          <p className="form-message" role="alert">
            {formText.errorFeedback}
          </p>
        )}
        <fieldset
          disabled={pending}
          style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
        >
          <div className="hero-reg-fields">
            <div className="form-group">
              <label htmlFor={prefix + "-parent"}>{formText.parentLabel}</label>
              <div className="registration-input">
                {variant === "lower" && <RegistrationFieldIcon name="person" />}
                <input
                  id={prefix + "-parent"}
                  name="parent_name"
                  autoComplete="name"
                  placeholder={formText.parentPlaceholder}
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={prefix + "-phone"}>{formText.phoneLabel}</label>
              <div className="registration-input">
                {variant === "lower" && <RegistrationFieldIcon name="phone" />}
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
            </div>

            <div className="form-group">
              <label htmlFor={prefix + "-child"}>{formText.childLabel}</label>
              <div className="registration-input">
                {variant === "lower" && <RegistrationFieldIcon name="person" />}
                <input
                  id={prefix + "-child"}
                  name="child_name"
                  autoComplete="off"
                  placeholder={formText.childPlaceholder}
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={prefix + "-age"}>{formText.ageLabel}</label>
              <div className="hero-select">
                {variant === "lower" && <RegistrationFieldIcon name="users" />}
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
                {variant === "lower" && <RegistrationFieldIcon name="clock" />}
                <select
                  id={prefix + "-schedule"}
                  name="schedule"
                  defaultValue=""
                  required
                >
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
                {variant === "lower" && <RegistrationFieldIcon name="school" />}
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
                <div className="registration-input">
                  {variant === "lower" && <RegistrationFieldIcon name="school" />}
                  <input
                    id={prefix + "-other-school"}
                    name="school_other"
                    placeholder={formText.otherSchoolPlaceholder}
                    required
                    maxLength={150}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={
              "btn btn-camp btn-block" + (variant === "lower" ? " join-submit" : "")
            }
          >
            {pending ? formText.pendingLabel : formText.submitButton}
            <span aria-hidden="true">→</span>
          </button>
        </fieldset>
      </form>
    </div>
  );
}
