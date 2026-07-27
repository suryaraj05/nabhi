import { Resend } from "resend";
import type { ContactError, ContactPayload, ContactSuccess } from "@/lib/contact";
import { rateLimit } from "@/lib/rateLimit";

export type { ContactError, ContactPayload, ContactResponse, ContactSuccess } from "@/lib/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function parseBody(body: unknown): ContactPayload | ContactError {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return { ok: false, error: "Name is required." };
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return { ok: false, error: "A valid email is required." };
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return { ok: false, error: "Tell us a little more — at least a sentence." };
  }

  const cleanName = name.trim().slice(0, 200);
  const cleanEmail = email.trim().slice(0, 320);
  const cleanMessage = message.trim().slice(0, 5000);

  return { name: cleanName, email: cleanEmail, message: cleanMessage };
}

export async function POST(req: Request): Promise<Response> {
  const ip = clientIp(req);
  const limited = rateLimit(ip);
  if (!limited.ok) {
    return Response.json(
      { ok: false, error: "Too many messages. Try again in an hour." } satisfies ContactError,
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON." } satisfies ContactError,
      { status: 400 }
    );
  }

  const parsed = parseBody(json);
  if ("ok" in parsed && parsed.ok === false) {
    return Response.json(parsed satisfies ContactError, { status: 400 });
  }

  const { name, email, message } = parsed as ContactPayload;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return Response.json(
      {
        ok: false,
        error: "Contact is not configured yet. Write to hello@nabhi.com instead.",
      } satisfies ContactError,
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Nabhi — message from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
  });

  if (error) {
    return Response.json(
      { ok: false, error: "Could not send your message. Try hello@nabhi.com instead." } satisfies ContactError,
      { status: 502 }
    );
  }

  return Response.json({ ok: true } satisfies ContactSuccess);
}
