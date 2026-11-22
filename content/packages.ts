import type { Package } from "@/content/types";

/**
 * Public packages. Edit the prices here, or publish the same shape from
 * Laravel at GET /api/packages (an array, or { data: [...] }).
 * Prices are display strings, so "Rs 15,000" stays as written.
 */
export const packages: Package[] = [
  {
    id: "capacity-500",
    name: "500 active members",
    audience: "Device for up to 500 active members",
    price: "Rs 1,500",
    period: "software, per month",
    device: "Rs 15,000",
    monthly: "Rs 1,500",
    yearly: "Rs 12,000",
    description:
      "The desk for a smaller floor: memberships, attendance, the door, reminders, and messaging.",
    features: [
      "Device for up to 500 active members",
      "Unlimited members on the software",
      "Membership management",
      "Remote registration and renewals",
      "Attendance",
      "Door lock",
      "Expiry and credit reminders",
      "Absentee tracking and follow-ups",
      "Messaging",
    ],
    highlighted: false,
    cta: "Try free demo",
  },
  {
    id: "capacity-1500",
    name: "1,500 active members",
    audience: "Device for up to 1,500 active members",
    price: "Rs 1,500",
    period: "software, per month",
    device: "Rs 25,000",
    monthly: "Rs 1,500",
    yearly: "Rs 15,000",
    description:
      "The full desk: classes, diet and workout plans, the shop, accounts, and analytics, on a larger device.",
    features: [
      "Device for up to 1,500 active members",
      "Unlimited members on the software",
      "Everything in 500 active members",
      "Inquiries",
      "Classes",
      "Diet and workout plans",
      "Customer retention",
      "Lockers",
      "Shop and cafe",
      "Accounting",
      "Transaction management",
      "Bank transactions",
      "Advanced analytics",
    ],
    highlighted: true,
    cta: "Try free demo",
  },
];
