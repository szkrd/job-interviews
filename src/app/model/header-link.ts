interface HeaderLinkItem {
  page?: string;
  per_page?: string;
  url?: string;
  rel?: string;
  q?: string;
}

export interface HeaderLink {
  next?: HeaderLinkItem;
  prev?: HeaderLinkItem;
  first?: HeaderLinkItem;
  last?: HeaderLinkItem;
}
