import {Component, Input, OnInit} from '@angular/core';
import {IssueItem} from '../../models/issue-item';

@Component({
  selector: 'app-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.scss']
})
export class IssueItemComponent implements OnInit {
  @Input('item') item: IssueItem;

  constructor() { }

  ngOnInit() {
  }

}
