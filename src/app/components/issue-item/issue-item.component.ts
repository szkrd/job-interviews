import {Component, Input, OnInit} from '@angular/core';
import {IssueItem} from '../../models/issue-item';

@Component({
  selector: 'app-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.scss']
})
export class IssueItemComponent implements OnInit {
  showBody = false;

  @Input('item') item: IssueItem;

  constructor() { }

  ngOnInit() {
  }

  toggleBody (event: MouseEvent) {
    const el = event.target as HTMLElement;
    const markerClass = 'js-issue-item-body';
    const insideMarkdownZone = el.closest(`.${markerClass}`) !== null;
    const isMarkdownZone = el.classList.contains(markerClass);

    if (insideMarkdownZone || isMarkdownZone) {
      return;
    }
    this.showBody = !this.showBody;
  }
}
