import "server-only";

import { Resend } from "resend";

import { site } from "@/content/site";

/**
 * Transactional email for the site's forms.
 *
 * Delivery is optional at build and run time: with no RESEND_API_KEY set the
 * submission is logged and reported as delivered, so the site runs in
 * development and in preview deployments without credentials. Set the key (and
 * CONTACT_FROM_EMAIL on a verified Resend domain) to switch real sending on.
 */

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_TO_EMAIL ?? site.email;
const from = process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

/** Escapes a value before it goes into the HTML email body. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type MailResult = { ok: true } | { ok: false; error: string };

export async function sendFormEmail({
  subject,
  rows,
  replyTo,
}: {
  subject: string;
  rows: { label: string; value: string }[];
  replyTo?: string;
}): Promise<MailResult> {
  const text = rows
    .map((r) => `${r.label}: ${r.value || "—"}`)
    .join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#1a2540">
      <h2 style="font-size:18px;margin:0 0 16px">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            (r) => `<tr>
              <td style="padding:6px 16px 6px 0;color:#55627a;vertical-align:top;white-space:nowrap">${escapeHtml(r.label)}</td>
              <td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(r.value) || "—"}</td>
            </tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:24px;font-size:12px;color:#8894a8">
        Sent from the ${escapeHtml(site.name)} website.
      </p>
    </div>`;

  if (!resend) {
    console.info(
      `[forms] RESEND_API_KEY is not set — submission not emailed.\n${subject}\n${text}`,
    );
    return { ok: true };
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `${subject} — ${site.name}`,
      replyTo,
      text,
      html,
    });
    if (error) {
      console.error("[forms] Resend rejected the message:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[forms] Could not reach Resend:", err);
    return { ok: false, error: "Mail service unavailable." };
  }
}
