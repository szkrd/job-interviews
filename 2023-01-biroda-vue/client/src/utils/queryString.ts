function parse(text: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(text) as any);
}

function from(obj: Record<string, string | number | boolean>): string {
  const params = new URLSearchParams('');
  for (const prop in obj) params.append(prop, String(obj[prop]));
  return params.toString();
}

export const queryString = { from, parse };
