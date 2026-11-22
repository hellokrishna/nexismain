import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const i = trimmed.indexOf("=");
      if (i < 0) continue;
      const key = trimmed.slice(0, i).trim();
      const value = trimmed.slice(i + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    console.error("Missing .env.local");
    process.exit(1);
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!url) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL in .env.local");
  process.exit(1);
}
if (!key) {
  console.error(
    "Set SUPABASE_SERVICE_ROLE_KEY in .env.local\n" +
      "Supabase → Project Settings → API → service_role (secret) → Reveal → copy\n" +
      "Do not use the publishable / anon key for desk writes.",
  );
  process.exit(1);
}

const db = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: clients, error: clientsError } = await db.from("clients").select("id,name").limit(5);
if (clientsError) {
  console.error("clients read failed:", clientsError.message);
  process.exit(1);
}
console.log("OK clients read:", clients?.length ?? 0, "row(s)");

const { data: buckets, error: bucketError } = await db.storage.listBuckets();
if (bucketError) {
  console.error("storage list failed:", bucketError.message);
  process.exit(1);
}
const desk = (buckets ?? []).find((b) => b.name === "desk-media" || b.id === "desk-media");
if (!desk) {
  console.error(
    'Missing bucket "desk-media". In Supabase SQL editor, run the storage section of supabase/schema.sql again.',
  );
  process.exit(1);
}
console.log("OK desk-media bucket");

const testId = `probe-${Date.now()}`;
const { error: writeError } = await db.from("clients").upsert({
  id: testId,
  name: "Local Probe",
  district: "Chitwan",
  logo: "",
  image: "",
});
if (writeError) {
  console.error("clients write failed:", writeError.message);
  process.exit(1);
}
await db.from("clients").delete().eq("id", testId);
console.log("OK clients write + delete");
console.log("Supabase is ready for local desk testing.");
