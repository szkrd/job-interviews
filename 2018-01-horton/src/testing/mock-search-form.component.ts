import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-form',
  template: '<div class="app-search-form"></div>'
})
export class MockSearchFormComponent {
  @Input('query') query;
}
