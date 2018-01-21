import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

export function changeInputValue (el: HTMLInputElement, value) {
  const event = new Event('input', {
    bubbles: true,
    cancelable: true
  });
  el.value = value;
  el.dispatchEvent(event);
}

export function getNativelElementByCss (el: DebugElement, selector = 'div'): HTMLElement {
  return el.query(By.css(selector)).nativeElement;
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
