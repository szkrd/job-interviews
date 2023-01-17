import { humanize } from './i18n';

interface IAntTableColumn {
  title: string;
  dataIndex: string;
  key: string;
}

/**
 * Returns IAntTableColumn[] based on object keys;
 * the order can be sat as a comma delimited list of keys (string).
 */
export function getTableColumns(
  objs: unknown,
  order = '*',
  translations: Record<string, string> = {}
): IAntTableColumn[] {
  if (!Array.isArray(objs)) objs = [objs];
  const keys: string[] = [];
  (objs as any[]).forEach((obj) => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((prop) => {
        if (!keys.includes(prop)) keys.push(prop);
      });
    }
  });
  const asIs: IAntTableColumn[] = keys.map((key) => ({
    title: translations[key] ?? humanize(key),
    dataIndex: key,
    key,
  }));
  if (!order || order === '*') return asIs;
  return order
    .split(',')
    .map((ordKey) => asIs.find((item) => item.key === ordKey) ?? null)
    .filter((x) => x) as IAntTableColumn[];
}
