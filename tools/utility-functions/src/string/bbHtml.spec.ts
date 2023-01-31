import { bbHtml } from './bbHtml';

describe('bbHtml', () => {
  test('convert basic "bbish" string to raw html', () => {
    expect(bbHtml('hello[br]world')).toBe('hello<br>world');

    expect(bbHtml('hello [b]world[/b]')).toBe('hello <strong>world</strong>');

    expect(bbHtml('hello [i]world[/i]')).toBe('hello <em>world</em>');
  });

  test('do nothing if opening and closing tag count mismatches', () => {
    expect(bbHtml('hello [i]world[/i][/i]')).toBe('hello [i]world[/i][/i]');
    expect(bbHtml('hello [b]world')).toBe('hello [b]world');
  });

  test('support basic links', () => {
    // invalid format
    expect(bbHtml('hello [url]world[/url]')).toBe('hello [url]world[/url]');

    // quotes are optional
    expect(bbHtml('hello [url=foobar]world[/url]')).toBe('hello <a href="foobar" target="_blank">world</a>');
    expect(bbHtml('hello [url="foobar"]world[/url]')).toBe('hello <a href="foobar" target="_blank">world</a>');
    expect(bbHtml("hello [url='foobar']world[/url]")).toBe('hello <a href="foobar" target="_blank">world</a>');
  });
});
