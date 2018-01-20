import { HttpHeaders } from '@angular/common/http';
import { HeaderLink as Link } from './header-link';

const parseLinkHeader = require('parse-link-header');

interface RateLimit {
  limit: number;
  remaining: number;
}

export class GithubExtractedHeader {
  rateLimit: RateLimit;
  link: Link;

  constructor (headers: HttpHeaders) {
    const rateLimit: RateLimit = {
      limit: Number(headers.get('x-ratelimit-limit')),
      remaining: Number(headers.get('x-ratelimit-remaining'))
    };
    const link = parseLinkHeader(headers.get('link'));
    this.rateLimit = rateLimit;
    this.link = link;
  }
}
