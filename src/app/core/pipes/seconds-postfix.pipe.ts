import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsPostfix',
  standalone: true
})
export class SecondsPostfixPipe implements PipeTransform {

  transform(input: number): string {
    return `${input}s`;
  }

}
