const map = new Map<string, { count: number; ts: number }>();
const WINDOW = 60_000;
const LIMIT = 5;

export function rateLimit(key: string) {
  const now = Date.now();
  const rec = map.get(key);
  if (!rec || now - rec.ts > WINDOW) {
    map.set(key, { count: 1, ts: now });
    return true;
  }
  if (rec.count >= LIMIT) return false;
  rec.count++;
  return true;
}
