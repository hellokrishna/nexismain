"use client";

import { useState } from "react";

export function PasswordField({
  name = "password",
  label = "Password",
  error,
}: {
  name?: string;
  label?: string;
  error?: boolean;
}) {
  const [visible, setVisible] = useState(true);

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          required
          autoComplete="current-password"
          className="h-12 w-full rounded-2xl border border-line bg-card px-4 pr-14 font-normal text-foreground"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-background hover:text-foreground"
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((value) => !value)}
        >
          {visible ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M3 3l18 18" />
              <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
              <path d="M9.9 5.2A10.4 10.4 0 0 1 12 5c5 0 9.3 3.6 10.5 7-0.4 1.1-1.1 2.2-2 3.1" />
              <path d="M6.1 6.1C4.2 7.4 2.8 9.1 2 12c1.2 3.4 5.5 7 10.5 7 1.7 0 3.3-.4 4.7-1.1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {error ? (
        <p role="alert" className="text-sm text-alert">
          That password did not match.
        </p>
      ) : null}
    </div>
  );
}
