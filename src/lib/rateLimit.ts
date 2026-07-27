const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

type Entry = { count: number; resetAt: number };

const hits = new Map<string, Entry>();

/** In-memory IP rate limit — sufficient at launch; swap for Redis if traffic grows. */
export function rateLimit(ip: string): { ok: true } | { ok: false } {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= MAX_REQUESTS) return { ok: false };

  entry.count += 1;
  return { ok: true };
}
