type FieldIcon = "person" | "phone" | "users" | "clock" | "school";

// Small line icons shown inside the registration inputs.
export default function RegistrationFieldIcon({ name }: { name: FieldIcon }) {
  return (
    <svg
      className="registration-field-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "person" && (
        <>
          <circle cx="12" cy="7" r="3.5" />
          <path d="M5 21v-3a7 7 0 0 1 14 0v3Z" />
        </>
      )}
      {name === "phone" && (
        <path d="m7 3 3 5-3 2c2 4 3 5 7 7l2-3 5 3c-1 6-5 6-10 3-5-3-8-7-9-12C1 4 4 2 7 3Z" />
      )}
      {name === "users" && (
        <>
          <circle cx="9" cy="7" r="3" />
          <path d="M3 20v-2a6 6 0 0 1 12 0v2H3ZM17 4a3 3 0 0 1 0 6M18 13a5 5 0 0 1 3 5v2h-3" />
        </>
      )}
      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v6l4 2" />
        </>
      )}
      {name === "school" && (
        <>
          <path d="M3 21V6l8-3v18M11 9l10 3v9M1 21h22M6 8h2M6 12h2M6 16h2M15 14h2M15 17h2M15 21v-4" />
        </>
      )}
    </svg>
  );
}
