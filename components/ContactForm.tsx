"use client";

import { useActionState } from "react";
import type { Package } from "@/content/types";
import { submitInquiry, type InquiryState } from "@/app/inquiry-action";

const initialState: InquiryState = { status: "idle", message: "" };

export function ContactForm({ packages }: { packages: Package[] }) {
  const [state, action, pending] = useActionState(submitInquiry, initialState);
  const message = state.message;
  const isError = state.status === "error";

  return (
    <form
      className="grid gap-4"
      action={action}
    >
      <div className="sr-only" aria-hidden="true">
        <label>
          Company website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Gym or studio" name="studio" autoComplete="organization" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <label className="grid gap-2 text-sm font-semibold">
        Package
        <select
          name="packageInterest"
          defaultValue=""
          className="h-12 rounded-2xl border border-line bg-background px-4 font-normal text-foreground"
        >
          <option value="">Not sure yet</option>
          {packages.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        What should we know?
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-2xl border border-line bg-background px-4 py-3 font-normal leading-6 text-foreground"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-full bg-lime px-6 font-semibold text-background disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send to the desk"}
      </button>
      {message ? (
        <p role={isError ? "alert" : "status"} className={isError ? "text-sm text-alert" : "text-sm text-muted"}>
          {message}
        </p>
      ) : (
        <p className="text-sm text-muted">
          We save this on the desk and reply by email. No newsletter.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="h-12 rounded-2xl border border-line bg-background px-4 font-normal text-foreground"
      />
    </label>
  );
}
