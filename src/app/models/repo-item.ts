export class RepoItem {
  id: number;
  url: string;
  homepage: string;
  name: string;
  fullName: string;
  description: string;
  forks: number;
  stargazersCount: number;
  openIssuesCount: number;
  watchers: number;

  constructor (rawItem) {
    this.id = rawItem.id;
    this.url = rawItem.html_url;
    this.homepage = rawItem.html_url || '';
    this.name = rawItem.name;
    this.fullName = rawItem.full_name;
    this.description = rawItem.description || '';
    this.forks = rawItem.forks;
    this.stargazersCount = rawItem.stargazers_count;
    this.openIssuesCount = rawItem.open_issues_count;
    this.watchers = rawItem.watchers;
  }
}
