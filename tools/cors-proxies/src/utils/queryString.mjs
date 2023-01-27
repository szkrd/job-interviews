function parse(text) {
  // I'm not using `Object.fromEntries(new URLSearchParams(text));` because I want to support arrays
  // like ?a=1&a=2&a=3 -> { a: [1, 2, 3] }
  text = text.replace(/^\?/, '');
  const ret = {};
  const pairs = text.split('&');
  pairs.forEach((pair) => {
    const keyVal = pair.split('=');
    if (keyVal.length === 1) return;
    const key = keyVal[0];
    const val = decodeURIComponent(keyVal[1]);
    if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else if (ret[key] !== undefined) {
      ret[key] = [ret[key], val];
    } else {
      ret[key] = val;
    }
  });
  return ret;
}

function from(obj) {
  const params = new URLSearchParams('');
  for (const prop in obj) params.append(prop, String(obj[prop]));
  return params.toString();
}

export const queryString = { from, parse };
