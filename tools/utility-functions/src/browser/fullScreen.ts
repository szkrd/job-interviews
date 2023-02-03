/* eslint-disable @typescript-eslint/no-explicit-any */

// https://github.com/rafrex/fscreen
// Vendor agnostic access to the Fullscreen API.
// The new spec says that promises shall be returned - that has not been implemented here so far.
type EventHandlerType = 'fullscreenchange' | 'fullscreenerror';

// the code below expects an object, not a typescript enum
const key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
};

const common = (prefix: 'webkit' | 'moz' | 'ms') => [
  `${prefix}FullscreenEnabled`,
  `${prefix}FullscreenElement`,
  `${prefix}RequestFullscreen`,
];

const webkit = [...common('webkit'), 'webkitExitFullscreen', 'webkitfullscreenchange', 'webkitfullscreenerror'];
const moz = [...common('moz'), 'mozCancelFullScreen', 'mozfullscreenchange', 'mozfullscreenerror'];
const ms = [...common('ms'), 'msExitFullscreen', 'MSFullscreenChange', 'MSFullscreenError'];

// so it doesn't throw if no window or document
const document = (
  typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {}
) as Document;

const vendor =
  ('fullscreenEnabled' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (moz[0] in document && moz) ||
  (ms[0] in document && ms) ||
  [];

export const fullScreen = {
  requestFullscreen: (element) => element[vendor[key.requestFullscreen]](),
  requestFullscreenFunction: (element) => element[vendor[key.requestFullscreen]],
  get exitFullscreen() {
    return document[vendor[key.exitFullscreen]].bind(document);
  },
  addEventListener: (type: EventHandlerType, handler, options?: EventListenerOptions) =>
    document.addEventListener(vendor[key[type]], handler, options),
  removeEventListener: (type: EventHandlerType, handler, options?: EventListenerOptions) =>
    document.removeEventListener(vendor[key[type]], handler, options),
  get fullscreenEnabled() {
    return Boolean(document[vendor[key.fullscreenEnabled]]);
  },
  set fullscreenEnabled(val: any) {
    /* empty stub */
  },
  // document.fullscreen is deprecated, use fullscreenElement!
  get fullscreenElement() {
    return document[vendor[key.fullscreenElement]];
  },
  set fullscreenElement(val: any) {
    /* empty stub */
  },
  get onfullscreenchange() {
    return document[`on${vendor[key.fullscreenchange]}`.toLowerCase()];
  },
  set onfullscreenchange(handler) {
    document[`on${vendor[key.fullscreenchange]}`.toLowerCase()] = handler;
  },
  get onfullscreenerror() {
    return document[`on${vendor[key.fullscreenerror]}`.toLowerCase()];
  },
  set onfullscreenerror(handler) {
    document[`on${vendor[key.fullscreenerror]}`.toLowerCase()] = handler;
  },
};
