import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';

export function changeInputValue (el: HTMLInputElement, value = '') {
  const event = new Event('input', {
    bubbles: true,
    cancelable: true
  });
  el.value = value;
  el.dispatchEvent(event);
}

export function getTextWithSelector (el: DebugElement, selector = 'div', forgiving = false): string {
  const qEl = el.query(By.css(selector));
  if (!qEl) {
    if (forgiving) {
      return '';
    } else {
      throw new Error(`getTextWithSelector: "${selector}" items not found.`);
    }
  }
  return (qEl.nativeElement.textContent || '').trim();
}

const ButtonClickEvents = {
  left:  { button: 0 },
  right: { button: 2 }
};

// simulate click on plain or debug element, taken from angular docs
export function clickElement (el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

// modify @Input value and trigger changes
export function triggerInput (fixture: ComponentFixture<any>, propName: string, newValue: any) {
  const comp = fixture.componentInstance;
  const oldValue = comp[propName];
  comp[propName] = newValue;
  if (typeof comp.ngOnChanges === 'function') {
    comp.ngOnChanges({
      [propName]: new SimpleChange(oldValue, newValue, false)
    });
  }
  fixture.detectChanges();
}
