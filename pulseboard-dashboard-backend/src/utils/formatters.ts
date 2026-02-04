export function formatUserName(email: string): string {
  const name = email.split("@")[0];

  return name
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function calculateRate(part: number, total: number): number {
  if (!total) return 0;
  return Number(((part / total) * 100).toFixed(1));
}

export function formatAverage(total: number, count: number): number {
  if (!count) return 0;
  return Number((total / count).toFixed(1));
}
