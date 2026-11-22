import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

const cookieName = "nexis_desk";

function secret() {
  const raw = process.env.ADMIN_PASSWORD?.trim() ?? "";
  // Vercel / .env values are sometimes wrapped in quotes.
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1).trim();
  }
  return raw;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function deskPasswordIsSet() {
  return secret().length >= 8;
}

export async function deskIsSignedIn() {
  await connection();
  if (!deskPasswordIsSet()) return false;
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (!token) return false;
  const [issued, signature] = token.split(".");
  if (!issued || !signature) return false;
  const expected = sign(issued);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  const age = Date.now() - Number(issued);
  return Number.isFinite(age) && age >= 0 && age < 1000 * 60 * 60 * 24 * 14;
}

export async function signInToDesk(password: string) {
  if (!deskPasswordIsSet()) return false;
  const givenText = password.trim();
  const expectedText = secret();
  const given = Buffer.from(givenText);
  const expected = Buffer.from(expectedText);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
  const issued = String(Date.now());
  const jar = await cookies();
  jar.set(cookieName, `${issued}.${sign(issued)}`, {
    httpOnly: true,
    sameSite: "lax",
    // Only force HTTPS cookies on Vercel. Local `next start` is plain http.
    secure: process.env.VERCEL === "1",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return true;
}

export async function signOutOfDesk() {
  const jar = await cookies();
  jar.delete(cookieName);
}
