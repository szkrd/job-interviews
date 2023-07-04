import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts input to truncated string, appends unicode ellipsis character.
 * Param 1 is length, param 2 is the ellipsis text or char.
 */
@Pipe({
  name: 'textEllipsis',
  standalone: true,
})
export class TextEllipsisPipe implements PipeTransform {
  transform(value: string | undefined, args?: [number?, string?]): string {
    const DEFAULT_CHAR = '…';
    const DEFAULT_LENGTH = 100;
    args = args ?? [];
    value = value ?? '';
    const limit = args.length > 0 ? parseInt(String(args[0]), 10) : DEFAULT_LENGTH;
    const trail = args.length > 1 ? args[1] : DEFAULT_CHAR;
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
