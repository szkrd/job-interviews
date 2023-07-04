import { NgIterable, Pipe, PipeTransform } from '@angular/core';

/**
 * Converts number to iterable (array of numbers), similar to lodash `range`.
 * Useful with ngFor, forcing the directive to act like a simple `for ()` construct.
 */
@Pipe({
  name: 'forNumber',
  standalone: true,
})
export class ForNumberPipe implements PipeTransform {
  transform(value: any): NgIterable<number> {
    const arr = [];
    const len = parseInt(value, 10);
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  }
}
