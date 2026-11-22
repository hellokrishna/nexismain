import type { Post } from "@/content/types";

export const posts: Post[] = [
  {
    slug: "match-gym-bank-transfers",
    title: "Match gym bank transfers to the right member",
    description:
      "How a gym can tie an incoming bank transfer to the membership it paid for, before the books and the front desk disagree.",
    date: "2026-11-18",
    updated: "2026-11-18",
    author: "Nexfit",
    tags: ["accounting", "bank transactions", "memberships"],
    readingMinutes: 5,
    relatedSlugs: ["membership-expiry-reminders", "door-access-and-attendance"],
    blocks: [
      {
        type: "p",
        text: "A gym can look busy and still be unclear about who has paid. Cash at the desk is easy to see. A bank transfer that arrives with a half-written name is not. By the time someone searches old chats for the screenshot, the membership list and the accounts have already split.",
      },
      {
        type: "h2",
        text: "The transfer needs a member, not a pile",
      },
      {
        type: "p",
        text: "Bank transaction management is the habit of attaching each incoming payment to the membership it belongs to. The amount, the date, and the member sit together. Accounting then reads that same link, instead of a second spreadsheet that was rebuilt on Friday.",
      },
      {
        type: "p",
        text: "Unmatched payments are the ones that cause the arguments. A transfer with no member is a queue, not a mystery. Someone at the desk can clear it the same day, while the payer still remembers what the money was for.",
      },
      {
        type: "h2",
        text: "What to keep on the payment",
      },
      {
        type: "ul",
        items: [
          "The member the money is for, even when a parent or a company paid.",
          "The package or invoice it should close.",
          "Whether it is a renewal, a locker, a credit pack, or something else.",
          "Anything still unmatched, listed on its own so it cannot hide in the feed.",
        ],
      },
      {
        type: "h2",
        text: "Keep the desk and the books on one name",
      },
      {
        type: "p",
        text: "When accounting lives beside the membership, a freeze, a refund, or an upgrade does not require a hunt through messages. The person at the door and the person closing the month are looking at the same record. That is the point of putting bank transactions in the same system as the plan.",
      },
    ],
  },
  {
    slug: "diet-plans-on-the-membership",
    title: "Keep diet plans on the membership",
    description:
      "Why a diet plan belongs on the member record, next to attendance and the package, instead of in a coach's private messages.",
    date: "2026-11-04",
    updated: "2026-11-04",
    author: "Nexfit",
    tags: ["diet plans", "coaching", "retention"],
    readingMinutes: 5,
    relatedSlugs: ["absentee-tracking-for-gyms", "membership-expiry-reminders"],
    blocks: [
      {
        type: "p",
        text: "A diet plan that lives in a private chat belongs to the coach's phone, not to the gym. When that coach is off, or the member asks the desk what they are supposed to eat this week, nobody at the counter can answer. The plan was never part of the membership.",
      },
      {
        type: "h2",
        text: "Put the plan where the visit already is",
      },
      {
        type: "p",
        text: "Diet plan management works when the plan sits on the same record as attendance and the package. The desk can see that a plan exists. The coach can see whether the member is actually coming in. A plan with no visits is a different conversation from a plan the member is following.",
      },
      {
        type: "ul",
        items: [
          "Who the plan is for, and which coach owns the next review.",
          "When it should be looked at again.",
          "The membership it belongs to, so a lapsed member is not still being coached by accident.",
        ],
      },
      {
        type: "h2",
        text: "Reviews are a list, not a memory",
      },
      {
        type: "p",
        text: "A review date turns coaching into a queue. Three plans due this week is a piece of work. Three plans that someone meant to update is how members drift. Retention is often this unglamorous: a person, a plan, and a date that is not allowed to pass in silence.",
      },
      {
        type: "p",
        text: "Nexfit keeps the diet plan on the member so the floor, the coach, and the desk are not running three versions of the same person.",
      },
    ],
  },
  {
    slug: "door-access-and-attendance",
    title: "Connect door access to gym attendance",
    description:
      "Pair the door lock with attendance so a visit is one event, and unpaid or expired memberships do not slip through on a spare fob.",
    date: "2026-10-21",
    updated: "2026-10-21",
    author: "Nexfit",
    tags: ["door lock", "attendance", "access"],
    readingMinutes: 5,
    relatedSlugs: ["absentee-tracking-for-gyms", "match-gym-bank-transfers"],
    blocks: [
      {
        type: "p",
        text: "A lot of gyms run two truths at the entrance. The door opens because someone still has a fob. The attendance sheet says something else, because the desk was busy and the member walked past. By the end of the month those two lists do not describe the same building.",
      },
      {
        type: "h2",
        text: "One visit, checked once",
      },
      {
        type: "p",
        text: "Door access and attendance should be the same event. The lock asks the membership if this person is allowed in. The check-in is written at the same time. There is no later step where someone copies names into a notebook.",
      },
      {
        type: "p",
        text: "That only works if the lock is looking at the live plan. An expired membership, a frozen plan, or a balance the desk has already flagged should not still open the door because a card was never collected.",
      },
      {
        type: "h2",
        text: "What the desk stops doing",
      },
      {
        type: "ul",
        items: [
          "Arguing about whether someone trained on a day the sheet missed.",
          "Collecting fobs by memory when a plan ends.",
          "Guessing absentees from a paper list that was never finished.",
        ],
      },
      {
        type: "h2",
        text: "Lockers belong in the same check",
      },
      {
        type: "p",
        text: "A locker is another yes or no on the same person. Who has it, and whether their membership still allows it, should be visible when they walk in. When access, attendance, and lockers share the member record, the front door gets quieter because fewer decisions are left to whoever is standing there.",
      },
    ],
  },
  {
    slug: "absentee-tracking-for-gyms",
    title: "Track absentees before a member cancels",
    description:
      "Absentee tracking is a retention list: members who stopped checking in while the plan is still active, and the follow-up that should happen next.",
    date: "2026-10-02",
    updated: "2026-10-02",
    author: "Nexfit",
    tags: ["absentees", "retention", "follow-ups"],
    readingMinutes: 5,
    relatedSlugs: ["membership-expiry-reminders", "diet-plans-on-the-membership"],
    blocks: [
      {
        type: "p",
        text: "Most cancelled memberships do not start with a cancellation. They start with a week that went quiet, then two, while the plan was still being paid. The gym feels the gap later, when the person asks for a freeze or simply does not renew.",
      },
      {
        type: "h2",
        text: "An absentee is a member, not a statistic",
      },
      {
        type: "p",
        text: "Absentee tracking flags people who have stopped coming while the membership is still active. The useful version is a name, a last visit, and a reason to call. A chart of average visits is not a follow-up.",
      },
      {
        type: "ul",
        items: [
          "No check-in for a stretch you choose, such as ten days.",
          "The plan is still active, so there is something to save.",
          "A follow-up owner, so the name does not sit on a report nobody opens.",
        ],
      },
      {
        type: "h2",
        text: "Follow-up is the product",
      },
      {
        type: "p",
        text: "Customer retention here is ordinary desk work. Someone calls, writes down what the member said, and either books them back or learns that the plan should be frozen. Follow-ups management is that list, kept on the member, so the next person on shift can see it was already done.",
      },
      {
        type: "p",
        text: "Attendance makes this possible. If check-ins are incomplete, the absentee list is fiction. Tie the door and the desk to one visit, and the quiet members become visible while they are still yours.",
      },
    ],
  },
  {
    slug: "membership-expiry-reminders",
    title: "Send membership expiry reminders in time",
    description:
      "Set expiry reminders so the member and the front desk both hear about a lapsing plan before the person has already gone.",
    date: "2026-09-16",
    updated: "2026-09-16",
    author: "Nexfit",
    tags: ["memberships", "expiry reminders", "retention"],
    readingMinutes: 5,
    relatedSlugs: ["absentee-tracking-for-gyms", "match-gym-bank-transfers"],
    blocks: [
      {
        type: "p",
        text: "A membership that ends in silence is expensive. The member did not always decide to leave. Often nobody told them the date was close, and the desk found out when the door rejected a card or the person asked why they had been charged.",
      },
      {
        type: "h2",
        text: "Remind both sides",
      },
      {
        type: "p",
        text: "An expiry reminder has two audiences. The member needs a plain date and a way to renew. The desk needs a list for the week, so someone can speak to the people who will not answer a message. One without the other is how renewals become awkward conversations at the turnstile.",
      },
      {
        type: "ul",
        items: [
          "A first note with enough days left to choose a package.",
          "A shorter note when the date is close.",
          "A desk list of plans ending this week, including the ones who never replied.",
        ],
      },
      {
        type: "h2",
        text: "Credits run out on a different clock",
      },
      {
        type: "p",
        text: "Expiry is the end of the plan. Credits are the visits or sessions left inside it. Credit reminders matter for packs that can be used up long before the date on the contract. Tell the member while a few credits remain, not when the next class is already refused.",
      },
      {
        type: "p",
        text: "Both reminders only help if they read the live membership. A renewed plan should drop off the list the same day. Nexfit keeps expiry, credits, and the member on one record so the reminder is about the plan they actually have.",
      },
    ],
  },
];
