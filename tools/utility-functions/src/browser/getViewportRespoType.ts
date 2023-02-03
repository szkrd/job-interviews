// somewhere else, where we have our enums/models
enum RespoType {
  Phone,
  Phablet,
  Tablet,
  Desktop,
}

// see also: responsiveMixins.scss
export function getViewportRespoType() {
  const width = window.innerWidth;
  const BREAK_TINY = 479;
  const BREAK_SMALL = 640;
  const BREAK_LARGE = 992;
  if (width < BREAK_TINY) {
    return RespoType.Phone;
  } else if (width >= BREAK_TINY && width < BREAK_SMALL) {
    return RespoType.Phablet;
  } else if (width >= BREAK_SMALL && width < BREAK_LARGE) {
    return RespoType.Tablet;
  } else {
    return RespoType.Desktop;
  }
}
