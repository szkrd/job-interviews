import { CSSProperties } from 'react';

// why? why not :) let's hope that ant is nice enough so that
// I won't need much of this bastardized tailwindish corn flakes

const hFull: CSSProperties = { height: '100%' };
const wFull: CSSProperties = { width: '100%' };
const m0: CSSProperties = { margin: 0 };
const p0: CSSProperties = { padding: 0 };
const m0p0: CSSProperties = { ...m0, ...p0 };
const placeContentCenter: CSSProperties = { alignItems: 'center', justifyContent: 'center' };
const bgIndigo200: CSSProperties = { backgroundColor: 'rgb(199 210 254)' };
const bgIndigo300: CSSProperties = { backgroundColor: 'rgb(165 180 252)' };
const italic: CSSProperties = { fontStyle: 'italic' };
const textRight: CSSProperties = { textAlign: 'right' };
const overflowYAuto: CSSProperties = { overflowY: 'auto' };

export const style = {
  wFull,
  hFull,
  m0,
  p0,
  m0p0,
  placeContentCenter,
  bgIndigo200,
  bgIndigo300,
  italic,
  textRight,
  overflowYAuto,
};

// probably not the best idea: even though ts should be clever enough to
// find the references based on the keys, unfortunately it isn't :(
type styleNames = keyof typeof style;
export function styles(...parts: styleNames[] | CSSProperties[]) {
  let ret: CSSProperties = {};
  parts.forEach((part) => {
    if (typeof part === 'string' && style[part]) {
      ret = { ...ret, ...style[part] };
    } else if (part && typeof part === 'object') {
      ret = { ...ret, ...part };
    }
  });
  return ret;
}
