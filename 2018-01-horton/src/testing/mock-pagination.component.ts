import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: '<div id="app-pagination"></div>'
})
export class MockPaginationComponent {
  @Input('header-link') headerLink;
}
