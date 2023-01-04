import { Component, Input } from '@angular/core';
import { RepoItem } from '../../models/repo-item';

@Component({
  selector: 'app-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.scss']
})
export class RepoItemComponent {
  @Input('item') item: RepoItem;
}
