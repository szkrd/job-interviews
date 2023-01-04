/* tslint:disable: no-floating-promises directive-selector component-selector */
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockRouterLinkDirective } from '../testing/mock-router-link.directive';
import { MockRouterOutletComponent } from '../testing/mock-router-outlet.directive';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, MockRouterLinkDirective, MockRouterOutletComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router outlet', () => {
    expect(el.query(By.css('#router-outlet'))).toBeTruthy();
  });

  it('should have a title link that routes back to root', () => {
    const titleEl = el.query(By.css('.app-title'));
    expect(titleEl).toBeTruthy();
    expect(titleEl.nativeElement.textContent.trim()).toBeTruthy();
    const dir = titleEl.injector.get(MockRouterLinkDirective);
    expect(dir.routerLink).toBe('/');
  });
});
