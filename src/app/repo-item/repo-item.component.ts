import {Component, Input, OnInit} from '@angular/core';
import {RepoItem} from '../model/repo-item';

@Component({
  selector: 'app-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.scss']
})
export class RepoItemComponent implements OnInit {
  @Input('item') item: RepoItem;

  constructor() { }

  ngOnInit() {
  }

}
