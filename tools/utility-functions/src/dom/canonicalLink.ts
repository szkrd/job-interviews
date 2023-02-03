import { createHeadTag } from './createHeadTag';

const getTag = (): HTMLElement => document.querySelector('link[rel="canonical"]');

const addTag = (url: string) => {
  const el = getTag() || createHeadTag('link');
  el.setAttribute('rel', 'canonical');
  el.setAttribute('href', url);
};

const removeTag = () => {
  const el = getTag();
  if (el) {
    el.parentNode.removeChild(el);
  }
};

// adds or removes google canonical meta link tag
// (https://webmasters.googleblog.com/2009/02/specify-your-canonical.html)
export const canonicalLink = {
  addTag,
  removeTag,
};
