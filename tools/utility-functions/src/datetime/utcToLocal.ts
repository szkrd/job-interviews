const defaultLocaleSettings = {
  defaultTimeSettings: { hour: '2-digit', minute: '2-digit' },
  timeSettingsWithSeconds: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  },
};

const formatDate = (utcDate, timeOptions, localeSettings) => {
  const { locale, toLocaleStringOpts, defaultTimeSettings } = localeSettings;

  const newDate = new Date(utcDate);
  const timeSettings = timeOptions || defaultTimeSettings;

  let date, time;

  if (locale && toLocaleStringOpts) {
    date = newDate.toLocaleDateString(locale, toLocaleStringOpts);
    time = newDate.toLocaleTimeString(locale, timeSettings);
  } else {
    date = newDate.toLocaleDateString();
    time = newDate.toLocaleTimeString([], timeSettings);
  }

  return `${date}, ${time}`;
};

// now includes utcToLocalWithSeconds
// (I really don't think anyone uses localeSettings...)
export const utcToLocal = (utcDate, withSeconds = false, localeSettings) => {
  localeSettings = localeSettings || defaultLocaleSettings;
  if (!withSeconds) {
    return formatDate(utcDate, null, localeSettings);
  }
  const { timeSettingsWithSeconds } = localeSettings;
  return formatDate(utcDate, timeSettingsWithSeconds, localeSettings);
};
