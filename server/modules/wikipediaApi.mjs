import got from 'got';
import * as cheerio from 'cheerio';
import { config } from './config.mjs';

/**
 * Trims a movie title and removes the wikipedia forbidden characters
 */
function normalizeTitle(title = '') {
  return title
    .trim()
    .replace(/ /g, '_')
    .replace(/[#<>[\]|{}]/g, '_');
}

/**
 * Returns a url and a query param assembled for search
 * (wikipedia query params are "kinda complicated", here the quote
 * is escaped but space uses the + variant; also note that there's no
 * "search for X in category Y" feature, so this query assumes that
 * the movie has already been released and wikipedia people do
 * maintain a list of films for that given year)
 */
function getSearchUrl(title = '', releaseYear = 1900) {
  return (
    config.wikipedia.apiUrl +
    '?' +
    [
      `action=query`,
      `format=json`,
      `list=search`,
      `srsearch=%22${encodeURIComponent(title)}%22+incategory:${releaseYear}_films`,
    ].join('&')
  );
}

/**
 * Selects the best match from a list of wikipedia results
 * (the one that looks like the result for our title)
 */
function findMatchingMovie(searchResult = [], title = '') {
  const matches = searchResult.query.search.filter((item) =>
    normalizeTitle(item.title ?? '').startsWith(title)
  );
  if (matches.length !== 1) {
    console.warn(`Wikipedia fuzzy search for "${title}" had ${matches.length} candidates.`);
  }
  return matches[0] ?? {};
}

/**
 * Wikipedia snippets (inside the floading small tooltip thing)
 * contain some arbitrary html, let's clear that
 */
function formatSnippet(rawHtml = '') {
  const $ = cheerio.load(`<p>${rawHtml}</p>`);
  const text = $('p').text().trim();
  return text.length > 0 ? `${text}…` : '';
}

/**
 * Finds the first paragraphs (which we treat as a short description)
 * in a (html) wikipedia page (downloaded earlier as plain text)
 */
function findFirstWikipediaParagraph(rawHtml = '') {
  const $ = cheerio.load(rawHtml);
  const paragraphs = $('.mw-parser-output p:not([class*="empty"])');
  if (paragraphs.length > 0) {
    const para = $(paragraphs[0]);
    para.find('sup').replaceWith(''); // remove footnote references
    return para.text().trim();
  }
  console.warn('Wikipedia article paragraphs not found!');
  return '';
}

/**
 * Search for "movie-like thing" from a given year
 * (it's not possible to search for a "movie title" in the movies
 * category in wikipedia - since categories is a muddled concept)
 * then return various metadata about the page itself
 */
async function searchForMovie(title = '', releaseYear = 1900) {
  title = normalizeTitle(title);
  const url = getSearchUrl(title, releaseYear);
  console.info(`Calling wiki url "${url}"...`);
  // get title and pageid (snippet could be useful, but it's rather rudely
  // truncated so it may not be _that_ useful for a short description in our case)
  const searchResult = await got(url)
    .json()
    .then((result) => findMatchingMovie(result, title));
  const pageId = searchResult.pageid;
  if (!pageId) {
    throw new Error('Wikipedia page id not found.'); // there's not much to do if this happens
  }
  // to get fullurl (or canonicalurl); the "FULLPAGENAME" in wikipedia docs
  // refers to the very last part of the canonical url, eg.:
  // canonicalurl: "https://en.wikipedia.org/wiki/Castle_in_the_Sky"
  // --> full page name is "Castle_in_the_Sky"
  // (while this can be used to get a raw text out of a wikipedia export,
  // using `Special:Export`, the result is inside a single xml node
  // and is a huge wall of text in wikipedia markup format)
  let singleMetaResult = {};
  try {
    const metaResult = await got(config.wikipedia.apiUrl, {
      searchParams: {
        action: 'query',
        prop: 'info',
        format: 'json',
        pageids: pageId,
        inprop: 'url',
      },
    }).json();
    singleMetaResult = metaResult?.query?.pages[String(pageId)] ?? {};
  } catch (err) {
    console.error('Error getting wikipedia info prop (for the canonical url)!', err);
  }
  const canonicalUrl = singleMetaResult.canonicalurl ?? '';
  // now that we have the canonical url (which is nicer than the ?curid one),
  // let's try to find a "description" (the first paragraph of an article)
  let text = '';
  if (canonicalUrl) {
    let rawHtml = '';
    try {
      rawHtml = await got(canonicalUrl).text();
      text = findFirstWikipediaParagraph(rawHtml);
    } catch (err) {
      console.error('Error downloading html wikipedia page!', err);
    }
  }
  return {
    /** number; internal page ID */
    pageId,
    /** string; human readable page (movie) title */
    pageTitle: searchResult.title ?? '',
    /** string; wikipedia hover snippet text, truncated */
    teaserSnippet: formatSnippet(searchResult.snippet),
    /** string; the full, human readable, seo friendly url */
    canonicalUrl,
    /** string; first non empty paragraph of the wikipedia page */
    firstParagraph: text,
  };
}

export const wikipediaApi = { searchForMovie };
