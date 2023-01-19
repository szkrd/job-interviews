export function random(max: number): number {
  return Math.floor(Math.random() * max);
}

export function formatMoney(val: number): string {
  return '$' + Number(val).toLocaleString('en-US', {minimumFractionDigits: 2});
}

export function formatDuration(val: number): string {
  const hours = Math.floor(val / 60);
  const minutes = val % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
}
