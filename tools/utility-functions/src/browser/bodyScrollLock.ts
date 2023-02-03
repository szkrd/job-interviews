// mostly from
// https://stackoverflow.com/questions/10592411/disable-scrolling-in-all-mobile-devices
// WARN: keyboard events are NOT handled for now (up, down, home, end, pgup, pgdown etc.)
//
// note about lockEventHandlers:
// on iOS in landscape mode safari's bottom bar appears,
// and without scrolling (lock event handlers true) that
// can not be hidden at all.
// (in portrait mode the fixed position's bottom right
// coordinates are above the bottom bar, but in landscape
// mode it's 0 0 and is behind the bottom bar)

// modals fire unlocking erratically,
// so we define lock groups here
const locks: Record<string, boolean> = {};
let hasClass = false;

const lastScrollPosition = {
  x: 0,
  y: 0,
};

const preventMotion = (event) => {
  window.scrollTo(0, 0);
  event.preventDefault();
  event.stopPropagation();
};

// let's stay on the safe side and ALWAYS define your groups
export type BodyScrollLockGroupNames = 'modal' | 'side-menu' | 'dropdown';

/**
 * Adds or removes the "scroll-lock" class to the body element and aggressively
 * preventing scroll and touchstart, while managing scroll lock groups (for example
 * a modal locked the scroll, but we also want to open "mobilish" dropdown)
 */
export const bodyScrollLock = (state: boolean, groupName: BodyScrollLockGroupNames, lockEventHandlers = false) => {
  const htmlEl = document.getElementsByTagName('HTML')[0];
  const getLockCount = () => Object.values(locks).reduce((acc, val) => Number(val) * 1, 0);
  const currentLockCount = getLockCount();

  locks[groupName] = state;
  if (state && !currentLockCount) {
    hasClass = true;
    lastScrollPosition.x = window.scrollX;
    lastScrollPosition.y = window.scrollY;
    htmlEl.classList.add('scroll-lock');
    if (lockEventHandlers) {
      window.addEventListener('scroll', preventMotion, false);
      window.addEventListener('touchmove', preventMotion, { passive: false });
    }
    return;
  }

  if (!state && !getLockCount() && hasClass) {
    hasClass = false;
    htmlEl.classList.remove('scroll-lock');
    if (lockEventHandlers) {
      window.removeEventListener('scroll', preventMotion);
      window.removeEventListener('touchmove', preventMotion);
    }
    window.scrollTo(lastScrollPosition.x, lastScrollPosition.y);
  }
};
