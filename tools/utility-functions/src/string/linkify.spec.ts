import { linkify } from './linkify';

describe('linkify', () => {
  test('convert link like texts to links', () => {
    let text = [
      'lorem ipsum',
      'www.google.com',
      'http://foobar.com',
      'http://szabolcs.kurdi.space',
      'www.bbc.co.uk',
      'very long link',
      'https://www.google.com/search?source=hp&ei=uAjHXJS_HImHwPAP-fas0A8&q=bbc.co.uk&btnK=Google+Search&oq=bbc.co.uk&gs_l=psy-ab.3..0l10.1301.2898..3123...0.0..0.90.736.11......0....1..gws-wiz.....0..0i10.DrLJnC-fSHY',
      'quite long indeed',
      'https://www.bbc.co.uk/news/entertainment-arts-48084977',
      'books and stuff',
      'https://books.google.hu/books?id=HW4qAAAAQBAJ&pg=PT116&lpg=PT116&dq=bbc.co.uk&source=bl&ots=JN6YgvTfdu&sig=ACfU3U1948stPMg7v2ZKTfOQ-KBG78syzg&hl=en&sa=X&ved=2ahUKEwjJgJm9wPXhAhW0AxAIHT-XBZY4HhDoATACegQIBxAB',
      'MOVIES & SERIES',
    ].join('\n');

    let expectation = [
      'lorem ipsum',
      '<a href="https://www.google.com" target="_blank" rel="noreferrer nofollow">www.google.com</a>',
      '<a href="http://foobar.com" target="_blank" rel="noreferrer nofollow">http://foobar.com</a>',
      '<a href="http://szabolcs.kurdi.space" target="_blank" rel="noreferrer nofollow">http://szabolcs.kurdi.space</a>',
      '<a href="https://www.bbc.co.uk" target="_blank" rel="noreferrer nofollow">www.bbc.co.uk</a>',
      'very long link',
      '<a href="https://www.google.com/search?source=hp&ei=uAjHXJS_HImHwPAP-fas0A8&q=bbc.co.uk&btnK=Google+Search&oq=bbc.co.uk&gs_l=psy-ab.3..0l10.1301.2898..3123...0.0..0.90.736.11......0....1..gws-wiz.....0..0i10.DrLJnC-fSHY" target="_blank" rel="noreferrer nofollow">https://www.google.com/search?source=hp&ei=uAjHXJS_HImHwPAP-fas0A8&q=bbc.co.uk&btnK=Google+Search&oq=bbc.co.uk&gs_l=psy-ab.3..0l10.1301.2898..3123...0.0..0.90.736.11......0....1..gws-wiz.....0..0i10.DrLJnC-fSHY</a>',
      'quite long indeed',
      '<a href="https://www.bbc.co.uk/news/entertainment-arts-48084977" target="_blank" rel="noreferrer nofollow">https://www.bbc.co.uk/news/entertainment-arts-48084977</a>',
      'books and stuff',
      '<a href="https://books.google.hu/books?id=HW4qAAAAQBAJ&pg=PT116&lpg=PT116&dq=bbc.co.uk&source=bl&ots=JN6YgvTfdu&sig=ACfU3U1948stPMg7v2ZKTfOQ-KBG78syzg&hl=en&sa=X&ved=2ahUKEwjJgJm9wPXhAhW0AxAIHT-XBZY4HhDoATACegQIBxAB" target="_blank" rel="noreferrer nofollow">https://books.google.hu/books?id=HW4qAAAAQBAJ&pg=PT116&lpg=PT116&dq=bbc.co.uk&source=bl&ots=JN6YgvTfdu&sig=ACfU3U1948stPMg7v2ZKTfOQ-KBG78syzg&hl=en&sa=X&ved=2ahUKEwjJgJm9wPXhAhW0AxAIHT-XBZY4HhDoATACegQIBxAB</a>',
      'MOVIES & SERIES',
    ].join('\n');

    expect(linkify(text)).toBe(expectation);

    // in multiline we already escape html and add line breaks
    text = [
      'lorem<br>',
      'ftp://www.example.com<br>',
      'lorem<br>',
      'www.google.com<br>',
      'www.google.com <br>',
      'www.krémsajt.hu/olcsó?kereső=legolcsóbb-kenhető-sajt<br>',
      'ipsum<br>',
      '"john@doe.co.uk"<br>',
      'ipsum<br>',
    ].join('\n');

    expectation = [
      'lorem<br>',
      '<a href="ftp://www.example.com" target="_blank" rel="noreferrer nofollow">ftp://www.example.com</a><br>',
      'lorem<br>',
      '<a href="https://www.google.com" target="_blank" rel="noreferrer nofollow">www.google.com</a><br>',
      '<a href="https://www.google.com" target="_blank" rel="noreferrer nofollow">www.google.com</a> <br>',
      '<a href="https://www.krémsajt.hu/olcsó?kereső=legolcsóbb-kenhető-sajt" target="_blank" rel="noreferrer nofollow">www.krémsajt.hu/olcsó?kereső=legolcsóbb-kenhető-sajt</a><br>',
      'ipsum<br>',
      '"<a href="mailto:john@doe.co.uk">john@doe.co.uk</a>"<br>',
      'ipsum<br>',
    ].join('\n');

    expect(linkify(text)).toBe(expectation);
  });
});
