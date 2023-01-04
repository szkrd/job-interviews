export default function fixAccents(s: string) {
  return (s || '').replace(/ue/, 'ü')
}
