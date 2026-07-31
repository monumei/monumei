/** Machine-style date: 2026.07.12 — matches the chassis readout vocabulary. */
export function stamp(date: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}.${p(date.getUTCMonth() + 1)}.${p(date.getUTCDate())}`;
}

/** Human date for the byline on a post page. */
export function longDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** ISO date for <time datetime>. */
export function iso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Bay address for a work unit: 1 -> "UNIT.01" */
export function bay(unit: number): string {
  return `UNIT.${String(unit).padStart(2, '0')}`;
}
