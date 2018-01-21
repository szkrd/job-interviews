/* tslint:disable: no-floating-promises */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { changeInputValue } from '../../../test/utils';
import { SearchFormComponent } from './search-form.component';
import createSpy = jasmine.createSpy;

@Component({
  template: `
    <app-search-form
      [query]="'foo'"
      example="bar"
      (query-change)="onChange($event)"
    >
      Baz
    </app-search-form>
  `
})
class TestComponent {
  @ViewChild(SearchFormComponent) child: SearchFormComponent;
  onChange = createSpy('onChange');
}

describe('SearchFormComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, SearchFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should update the input field from the @input value', () => {
    // just writing defaultQuery would not work, because the underlying system
    // is not reactive (and it doesn't have a setter), that's why we need the
    // wrapper TestComponent (or we could manually trigger the change on ngOnChanges)
    const inputValue = el.query(By.css('input')).nativeElement.value;
    expect(inputValue).toBe('foo');
  });

  it('should set the label to whatever the parent asks for', () => {
    const labelValue = (el.query(By.css('label')).nativeElement.textContent || '').trim();
    expect(labelValue).toBe('Baz');
  });

  it('should push the query value to parent on submit', () => {
    const inputEl = el.query(By.css('input')).nativeElement;
    const button = el.query(By.css('button')).nativeElement;
    changeInputValue(inputEl, 'corge');
    button.click();
    expect(component.onChange).toHaveBeenCalledWith('corge');
  });

  it('should disable the submit button for invalid values', () => {
    const inputEl = el.query(By.css('input')).nativeElement;
    const button = el.query(By.css('button')).nativeElement;
    changeInputValue(inputEl, 'x');

    // trigger dom updates (or just inject `ComponentFixtureAutoDetect` as true)
    fixture.detectChanges();

    // debugElement's attributes won't help, this is a prop
    // (or we could directly access the .child.form, but this is a bit nicer)
    expect(button.disabled).toBeTruthy();

    changeInputValue(inputEl, 'quux');
    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();

    changeInputValue(inputEl, '');
    fixture.detectChanges();
    expect(button.disabled).toBeTruthy();
  });
});
