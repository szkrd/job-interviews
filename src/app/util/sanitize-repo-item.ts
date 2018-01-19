import {RepoItem} from '../model/repo-item';

export default function sanitizeRepoItem (rawItem: any): RepoItem {
  return {
    id: rawItem.id,
    name: rawItem.name,
    fullName: rawItem.full_name,
    description: rawItem.description,
    forks: rawItem.forks,
    stargazersCount: rawItem.stargazers_count,
    openIssuesCount: rawItem.open_issues_count
  };
}
