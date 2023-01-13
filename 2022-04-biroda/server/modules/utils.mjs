export function clone(any) {
  return JSON.parse(JSON.stringify(any));
}

export function toInt(text = '', fallback) {
  if (fallback === undefined) throw new Error('toInt fallback value missing');
  if (/^\d+$/.test(text)) return parseInt(text, 10);
  return fallback;
}

export function getGenreColor(genre = '') {
  return (
    {
      Animation: 'pink',
      Comedy: 'pink',
      Family: 'pink',
      Adventure: 'red',
      Action: 'red',
      Crime: 'red',
      Thriller: 'red',
      Mystery: 'red',
      Drama: 'red',
      Horror: 'red',
      Romance: 'red',
      War: 'red',
      Western: 'red',
      'Science Fiction': 'orange',
      Fantasy: 'orange',
      'TV Movie': 'purple',
      Documentary: 'green',
      History: 'green',
      Music: 'green',
    }[genre] ?? 'blue'
  );
}
