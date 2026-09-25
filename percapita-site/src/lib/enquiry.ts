export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  /** Honeypot. Hidden from people; a filled value means a bot. */
  company: string;
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
  company: "",
};

/** The gate on the submit button — matches the prototype exactly. */
export function isValid(enquiry: Enquiry): boolean {
  return enquiry.name.trim().length > 1 && /\S+@\S+\.\S+/.test(enquiry.email);
}

/**
 * Posts the enquiry to /api/enquiry, which validates it again server-side and
 * emails it on. Throwing here is what surfaces the form's error state, so a
 * failure is visible rather than silent.
 */
export async function submitEnquiry(enquiry: Enquiry): Promise<void> {
  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(enquiry),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(body.error ?? "Could not send your enquiry.");
  }
}
