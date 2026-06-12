export function getAdminKeys(): string[] {
  return (process.env.ADMIN_KEYS ?? "").split(",").map((k) => k.trim()).filter(Boolean);
}

export async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function getHashedKeys(): Promise<string[]> {
  const keys = getAdminKeys();
  return Promise.all(keys.map(hashKey));
}

export async function isValidToken(token: string): Promise<boolean> {
  if (!token) return false;
  const hashedKeys = await getHashedKeys();
  return hashedKeys.includes(token);
}
