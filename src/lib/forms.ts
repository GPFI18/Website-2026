/**
 * Form definitions, validation and delivery.
 *
 * The four public forms all funnel through one shape: a field list that drives
 * both the rendered markup and server-side validation, and a single submit
 * handler that validates, screens for bots, and emails the organization.
 */

export type FormKind = "join" | "event" | "partner" | "contact";

export type FieldType = "text" | "email" | "tel" | "select" | "textarea";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  /** Marks the label with a quiet "(optional)". */
  optionalNote?: boolean;
  options?: readonly string[];
  rows?: number;
  /** Grid span within the form's 2-column layout. */
  span?: 1 | 2;
};

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field name → error message. */
  errors?: Record<string, string>;
  /** Echoed back so a failed submit doesn't wipe what was typed. */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(
  fields: FieldDef[],
  data: FormData,
): { errors: Record<string, string>; values: Record<string, string> } {
  const errors: Record<string, string> = {};
  const values: Record<string, string> = {};

  for (const field of fields) {
    const raw = data.get(field.name);
    const value = typeof raw === "string" ? raw.trim() : "";
    values[field.name] = value;

    if (field.required !== false && !value) {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }
    if (field.type === "email" && value && !EMAIL_RE.test(value)) {
      errors[field.name] = "Enter a valid email address.";
    }
    if (value.length > 4000) {
      errors[field.name] = "That's longer than we can accept.";
    }
  }

  return { errors, values };
}

/* ------------------------------------------------------------------ */
/* Field definitions, one set per form                                  */
/* ------------------------------------------------------------------ */

import { usStates } from "@/content/states";

export const joinFields: FieldDef[] = [
  { name: "name", label: "Full name", type: "text", placeholder: "Your full name", span: 2 },
  { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "(000) 000-0000" },
  { name: "city", label: "City", type: "text", placeholder: "City" },
  { name: "state", label: "State", type: "select", options: usStates },
];

export const eventFields: FieldDef[] = [
  { name: "name", label: "Full name", type: "text", placeholder: "Your full name", span: 2 },
  { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "(000) 000-0000" },
  { name: "city", label: "City", type: "text", placeholder: "City" },
  { name: "state", label: "State", type: "select", options: usStates },
  {
    name: "attendance",
    label: "Attendance preference",
    type: "select",
    options: ["In person", "Virtual", "Either"],
    span: 2,
  },
];

export const partnerFields: FieldDef[] = [
  { name: "name", label: "Full name", type: "text", placeholder: "Your full name", span: 2 },
  {
    name: "organization",
    label: "Organization",
    type: "text",
    placeholder: "Organization name",
    required: false,
    optionalNote: true,
    span: 2,
  },
  { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
  { name: "phone", label: "Phone number", type: "tel", placeholder: "(000) 000-0000" },
  {
    name: "partnershipType",
    label: "Partnership type",
    type: "select",
    options: [
      "Organizational partner",
      "Community affiliate",
      "Expert contributor",
      "Media / press",
      "Other",
    ],
    span: 2,
  },
  {
    name: "message",
    label: "How would you like to work together?",
    type: "textarea",
    placeholder: "A few words about your goals",
    rows: 4,
    span: 2,
  },
];

export const contactFields: FieldDef[] = [
  { name: "firstName", label: "First name", type: "text" },
  { name: "lastName", label: "Last name", type: "text" },
  { name: "email", label: "Email", type: "email", span: 2 },
  {
    name: "intent",
    label: "I'd like to",
    type: "select",
    options: [
      "Partner or collaborate",
      "Bring a strategy session to my community",
      "Contribute expertise to a think tank",
      "Media or press inquiry",
      "Something else",
    ],
    span: 2,
  },
  { name: "message", label: "Message", type: "textarea", rows: 5, span: 2 },
];

export const formConfig: Record<
  FormKind,
  { fields: FieldDef[]; subject: string; success: string; submitLabel: string }
> = {
  join: {
    fields: joinFields,
    subject: "New chapter sign-up",
    success: "Welcome aboard. We'll be in touch about your local chapter shortly.",
    submitLabel: "Join a Chapter",
  },
  event: {
    fields: eventFields,
    subject: "New event registration",
    success: "Thank you. We'll email you details for the next event shortly.",
    submitLabel: "Register Now",
  },
  partner: {
    fields: partnerFields,
    subject: "New partnership inquiry",
    success: "Thank you. We'll reach out to explore partnership opportunities.",
    submitLabel: "Submit Inquiry",
  },
  contact: {
    fields: contactFields,
    subject: "New contact enquiry",
    success: "Thank you. We'll be in touch shortly.",
    submitLabel: "Send Message",
  },
};
