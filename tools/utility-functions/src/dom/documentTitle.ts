import { truncateText } from '../string/truncateText';

const MAX_TITLE_LENGTH = 120;
const DEFAULT_TITLE = 'Application';
const APP_NAME = 'Facebook';

const unbreakAndTrim = (s = '') =>
  s
    .replace(/[\r\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function set(title = '') {
  const defaultTitle = DEFAULT_TITLE; // _t('pageHeader.defaultMetaTitle');
  if (title) {
    const isDefault = title === defaultTitle;
    const postfix = isDefault ? '' : ` - ${APP_NAME}`;
    document.title = title ? truncateText(unbreakAndTrim(title), MAX_TITLE_LENGTH - 8) + postfix : defaultTitle;
  }
}

function get() {
  return document.title;
}

export const documentTitle = {
  get,
  set,
};
