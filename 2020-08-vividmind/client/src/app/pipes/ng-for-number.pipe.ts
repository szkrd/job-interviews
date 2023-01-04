import { Pipe, PipeTransform } from '@angular/core';

// allows *ngFor to act as a for loop, example usage:
// `ngFor="let i of details.vote_average | ngForNumber"`
@Pipe({
  name: 'ngForNumber'
})
export class NgForNumberPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const arr = [];
    const l = parseInt(value, 10);
    for (let i = 0; i < l; i++) {
      arr.push(i);
    }
    return arr;
  }

}
