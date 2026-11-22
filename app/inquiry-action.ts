"use server";

import { site } from "@/content/site";
import { recordInquiry } from "@/app/admin-actions";
import { forwardInquiry } from "@/lib/laravel";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, name: string, max: number) {
  const value = formData.get(name);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  if (readField(formData, "companyWebsite", 200)) {
    return {
      status: "success",
      message: "Thanks. We will reply by email.",
    };
  }

  const name = readField(formData, "name", 80);
  const studio = readField(formData, "studio", 80);
  const email = readField(formData, "email", 120);
  const phone = readField(formData, "phone", 40);
  const packageInterest = readField(formData, "packageInterest", 40);
  const message = readField(formData, "message", 2000);

  if (name.length < 2) {
    return { status: "error", message: "Add your name so we know who to reply to." };
  }
  if (!emailPattern.test(email)) {
    return { status: "error", message: "Add a real email address." };
  }
  if (message.length < 10) {
    return { status: "error", message: "Tell us a little about the gym, at least a sentence." };
  }

  const payload = { name, studio, email, phone, packageInterest, message };

  try {
    await recordInquiry(payload);
  } catch {
    return {
      status: "error",
      message: `We could not save that just now. Email ${site.email} and we will pick it up.`,
    };
  }

  try {
    const result = await forwardInquiry(payload);
    if (result.connected && !result.response.ok) {
      return {
        status: "success",
        message: "Thanks. We have the note and will reply by email.",
      };
    }
  } catch {
    return {
      status: "success",
      message: "Thanks. We have the note and will reply by email.",
    };
  }

  return {
    status: "success",
    message: "Thanks. We have the note and will reply by email.",
  };
}
