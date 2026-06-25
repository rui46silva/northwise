import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead";

export const runtime = "nodejs";

const FROM = process.env.CONTACT_FROM_EMAIL ?? "leads@northwise.pt";
const TO = process.env.CONTACT_TO_EMAIL ?? "hello@northwise.pt";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Send the lead notification email via Resend. */
async function sendEmail(lead: {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured — surface clearly rather than silently dropping the lead.
    throw new Error("Email delivery is not configured.");
  }

  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company || "—"],
    ["Project type", lead.projectType],
    ["Budget", lead.budget],
    ["Message", lead.message],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">${k}</td><td style="padding:6px 12px">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Northwise <${FROM}>`,
      to: [TO],
      reply_to: lead.email,
      subject: `New lead — ${lead.name} (${lead.projectType})`,
      html: `<h2 style="font-family:sans-serif">New project enquiry</h2>
             <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend error: ${res.status} ${detail}`);
  }
}

/**
 * Push the lead into HubSpot as a contact.
 * Best-effort: a failure here must not block the email notification.
 */
async function syncToHubSpot(lead: {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  message: string;
}) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return; // CRM sync is optional.

  const [firstname, ...rest] = lead.name.split(" ");
  const lastname = rest.join(" ");

  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        email: lead.email,
        firstname,
        lastname,
        company: lead.company || undefined,
        message: `Project: ${lead.projectType} | Budget: ${lead.budget}\n\n${lead.message}`,
        lifecyclestage: "lead",
        hs_lead_status: "NEW",
      },
    }),
  });

  // 409 = contact already exists; that's fine, not an error worth surfacing.
  if (!res.ok && res.status !== 409) {
    const detail = await res.text().catch(() => "");
    console.error(`HubSpot sync failed: ${res.status} ${detail}`);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Please check the form and try again." },
      { status: 422 },
    );
  }

  const { website, ...lead } = parsed.data;

  // Honeypot tripped — pretend success so bots get no signal.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendEmail(lead);
  } catch (err) {
    console.error("Lead email failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please email us directly." },
      { status: 502 },
    );
  }

  // CRM sync is best-effort and runs after the critical email path.
  await syncToHubSpot(lead).catch((err) => console.error("HubSpot sync error:", err));

  return NextResponse.json({ ok: true });
}
