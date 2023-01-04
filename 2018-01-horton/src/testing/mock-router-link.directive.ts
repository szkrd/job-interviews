/* tslint:disable directive-selector */
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[routerLink], [queryParams]'
})
export class MockRouterLinkDirective {
  @Input('routerLink') routerLink: any;
  @Input('queryParams') queryParams: any;
}
