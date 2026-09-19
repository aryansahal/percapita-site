export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

export const TOPICS = [
  "Financial Planning",
  "Investment Advisory",
  "Mutual Funds",
  "Retirement",
  "Insurance",
] as const;

export const EMPTY_ENQUIRY: Enquiry = {
  name: "",
  email: "",
  phone: "",
  topic: "Financial Planning",
  message: "",
};

/** The gate on the submit button — matches the prototype exactly. */
export function isValid(enquiry: Enquiry): boolean {
  return enquiry.name.trim().length > 1 && /\S+@\S+\.\S+/.test(enquiry.email);
}

/**
 * OPEN ITEM: not wired up yet.
 *
 * The design prototype had no backend — it flipped local state and showed the
 * thank-you panel. Point this at the real endpoint or CRM and add server-side
 * validation plus spam protection; the client-side check above is a UX gate,
 * not a security boundary. Throwing here surfaces the form's error state.
 */
export async function submitEnquiry(enquiry: Enquiry): Promise<void> {
  void enquiry;
  return Promise.resolve();
}
