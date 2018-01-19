import {HttpResponse} from '@angular/common/http';
import {HeaderLink as Link} from '../model/header-link';
const parseLinkHeader = require('parse-link-header');

interface RateLimit {
  limit: number;
  remaining: number;
}

export interface GithubExtractedHeader {
  rateLimit: RateLimit;
  link: Link;
}

export default function extractGithubHttpHeaders (response: HttpResponse<any>): GithubExtractedHeader {
  const rateLimit: RateLimit = {
    limit: parseInt(response.headers.get('x-ratelimit-limit'), 10),
    remaining: parseInt(response.headers.get('x-ratelimit-remaining'), 10)
  };
  const link = parseLinkHeader(response.headers.get('link'));
  return {
    rateLimit,
    link
  };
}
