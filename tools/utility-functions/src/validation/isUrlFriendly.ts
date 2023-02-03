export const isUrlFriendly = (s) => {
  return /^[a-z0-9-_~.]+$/i.test(s);
};
