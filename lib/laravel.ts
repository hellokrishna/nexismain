export type InquiryPayload = {
  name: string;
  studio: string;
  email: string;
  phone: string;
  packageInterest: string;
  message: string;
};

export async function forwardInquiry(payload: InquiryPayload) {
  const origin = process.env.LARAVEL_API_URL?.trim().replace(/\/$/, "");
  if (!origin) return { connected: false as const };

  const token = process.env.LARAVEL_API_TOKEN?.trim();
  const response = await fetch(`${origin}/api/inquiries`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  return { connected: true as const, response };
}
