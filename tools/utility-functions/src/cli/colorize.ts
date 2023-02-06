const COLORS = { reset: 0, red: 31, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37 };
type TColors = keyof typeof COLORS;

const addColor = (colId: TColors = 'reset', text = '') => {
  const ansi = (num = 0) => `\x1b[${num}m`; // 1b = 033 (select graphic rendition)
  return ansi(COLORS[colId] || COLORS.reset) + text + ansi(COLORS.reset);
};

const getColorizer =
  (color: TColors) =>
  (text = '') =>
    addColor(color, text);

// Quick and simple chalk replacement
export const colorize = {
  red: getColorizer('red'),
  yellow: getColorizer('yellow'),
  cyan: getColorizer('cyan'),
  blue: getColorizer('blue'),
  magenta: getColorizer('magenta'),
  white: getColorizer('white'),
};
