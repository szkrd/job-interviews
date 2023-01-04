import { MarkdownDirective, MarkedWrapper } from './markdown.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

class MockMarkedWrapper implements MarkedWrapper {
  process = createSpy('process').and.callFake(() => 'foo');
}

@Component({
  template: `<div class="qux" [appMarkdown]="text"></div>`
})
class TestComponent {
  text = 'bar';
}

describe('MarkdownDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: DebugElement;
  let markedSpy;

  beforeEach(() => {
    markedSpy = new MockMarkedWrapper();
    TestBed.configureTestingModule({
      declarations: [ TestComponent, MarkdownDirective ]
    })
    .overrideDirective(MarkdownDirective, {
      set: {
        providers: [
          { provide: MarkedWrapper, useValue: markedSpy }
        ]
      }
    });

    // a somewhat cleaner way is to retrieve the mock's instance from the component itself:
    // `fixture.debugElement.injector.get(MarkedWrapper) as MockMarkedWrapper;`

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('div'));
  });

  it('should process the input from the attribute with marked', () => {
    fixture.detectChanges();
    expect(el.nativeElement.innerHTML).toBe('foo');
    expect(markedSpy.process).toHaveBeenCalledWith('bar');
  });

  it('should add a helper class called "markdown-body" to the element', () => {
    fixture.detectChanges();
    expect(el.nativeElement.className).toBe('qux markdown-body');
  });
});
