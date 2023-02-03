import { last } from '../array/last';

/**
 * Non-regexp simple email vailidity check.
 */
export function isValidEmail(text: string): boolean {
  const split = text.split('@');
  const namePart = split[0] ?? '';
  const domainPart = split[1] ?? '';
  const lastDomainPart = last(domainPart.split('.')) ?? '';
  return namePart.length > 0 && domainPart.includes('.') && domainPart.length >= 3 && lastDomainPart.length > 1;
}
