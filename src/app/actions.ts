"use server";

import { sendFormEmail } from "@/lib/mail";
import {
  formConfig,
  validate,
  type FormKind,
  type FormState,
} from "@/lib/forms";

/**
 * One server action behind all four public forms.
 *
 * Spam handling is a hidden honeypot field plus a minimum fill time. Both
 * return the success state rather than an error, so a bot learns nothing from
 * the response.
 *
 * Order matters here. Validation runs before the timing trap so that a genuine
 * person who submits quickly — browser autofill can complete a form in about a
 * second — still sees their field errors instead of a success message for a
 * submission that was never delivered. The honeypot runs first because it has
 * effectively no false positives: the field is off-screen and unlabelled, so
 * only an automated client ever fills it.
 */
export async function submitForm(
  kind: FormKind,
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const config = formConfig[kind];
  if (!config) {
    return { status: "error", message: "Unknown form." };
  }

  // Honeypot — a field no human sees, and so never fills in.
  if ((data.get("company") as string | null)?.trim()) {
    return { status: "success", message: config.success };
  }

  const { errors, values } = validate(config.fields, data);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const startedAt = Number(data.get("startedAt") ?? 0);
  if (startedAt && Date.now() - startedAt < 1200) {
    return { status: "success", message: config.success };
  }

  const rows = config.fields.map((field) => ({
    label: field.label,
    value: values[field.name] ?? "",
  }));

  const result = await sendFormEmail({
    subject: config.subject,
    rows,
    replyTo: values.email,
  });

  if (!result.ok) {
    return {
      status: "error",
      message:
        "We couldn't send that just now. Please try again, or email us directly.",
      values,
    };
  }

  return { status: "success", message: config.success };
}
