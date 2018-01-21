import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export function changeInputValue (el: HTMLInputElement, value = '') {
  const event = new Event('input', {
    bubbles: true,
    cancelable: true
  });
  el.value = value;
  el.dispatchEvent(event);
}

export function getTextWithSelector (el: DebugElement, selector = 'div'): string {
  return (el.query(By.css(selector)).nativeElement.textContent || '').trim();
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
