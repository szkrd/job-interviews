import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo-item',
  template: '<div class="app-repo-item"></div>'
})
export class MockRepoItemComponent {
  @Input('item') item;
}
