let lastId = 0;

export function getId(prefix = 'id'): string {
  return `${prefix}${lastId++}`;
}
