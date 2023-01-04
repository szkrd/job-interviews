interface IssueLabel {
  name: string;
  color: string;
}

export class IssueItem {
  id: number;
  title: string;
  createdAt: Date;
  userName: string; // user.login
  labels: IssueLabel[];
  body: string; // gh flavoured markdown

  constructor (rawItem) {
    this.id = rawItem.id;
    this.title = rawItem.title;
    this.createdAt = new Date(rawItem.created_at);
    this.userName = rawItem.user.login;
    this.labels = (rawItem.labels || []).map(label => Object.assign({}, {
      name: label.name,
      color: `#${label.color || 'fff'}`
    }));
    this.body = rawItem.body;
  }
}
