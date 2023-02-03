import { truncateText } from '../string/truncateText';

const MAX_DESCRIPTION_LENGTH = 300;

const unbreakAndTrim = (s) =>
  s
    .replace(/[\r\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const getTag = () => document.querySelector('meta[name=description]');
const setContent = (text: string) => getTag().setAttribute('content', text);

function set(description: string) {
  if (description) {
    setContent(truncateText(unbreakAndTrim(description), MAX_DESCRIPTION_LENGTH));
  }
}

function get() {
  const el: HTMLMetaElement = Array.from(document.getElementsByTagName('meta')).find((el) => el.name === 'description');
  return el ? el.content : '';
}

export const metaDescription = {
  get,
  set,
};
