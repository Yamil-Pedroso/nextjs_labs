import crypto from "crypto";
import stringify from "fast-json-stable-stringify";

export function hashSnapshot(snapshot: unknown): string {
  const stableJson = stringify(snapshot);
  return crypto.createHash("sha256").update(stableJson).digest("hex");
}
