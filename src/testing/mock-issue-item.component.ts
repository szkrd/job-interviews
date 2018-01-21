import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-issue-item',
  template: '<div class="app-issue-item"></div>'
})
export class MockIssueItemComponent {
  @Input('item') item;
}
