export const createHeadTag = (tagName: string): HTMLElement => {
  const el = document.createElement(tagName);
  document.getElementsByTagName('head')[0].appendChild(el);
  return el;
};
