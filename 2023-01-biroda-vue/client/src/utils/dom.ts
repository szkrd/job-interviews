import { Ref } from 'vue';

export function getFormSubmitFromRef(locator: Ref<null | HTMLElement>) {
  const dummyEl = locator.value! as HTMLElement;
  return dummyEl.closest('form')!.querySelector('button[type="submit"]') as HTMLButtonElement;
}
