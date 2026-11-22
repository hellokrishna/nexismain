"use client";

import { useState } from "react";
import { signIn } from "@/app/admin-actions";

export function LoginForm({ error }: { error?: boolean }) {
  const [visible, setVisible] = useState(true);

  return (
    <form action={signIn} className="mt-8 grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="password">
          Password
        </label>
        <div className="flex gap-2">
          <input
            id="password"
            name="password"
            type={visible ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="Type the desk password"
            className="h-12 min-w-0 flex-1 rounded-2xl border border-line bg-card px-4 font-normal text-foreground"
          />
          <button
            type="button"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-card px-4 text-sm font-semibold text-lime"
            aria-pressed={visible}
            onClick={() => setVisible((value) => !value)}
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>
        {error ? (
          <p role="alert" className="text-sm text-alert">
            That password did not match. Use the password from{" "}
            <code className="text-foreground">.env.local</code> (
            <code className="text-foreground">ADMIN_PASSWORD</code>
            ), exactly as written.
          </p>
        ) : (
          <p className="text-sm text-muted">
            Local desk password is in <code className="text-foreground">.env.local</code> as{" "}
            <code className="text-foreground">ADMIN_PASSWORD</code>.
          </p>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-full bg-lime px-6 font-semibold text-background"
      >
        Open the desk
      </button>
    </form>
  );
}
