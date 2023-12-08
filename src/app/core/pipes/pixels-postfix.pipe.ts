import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pixelsPostfix',
  standalone: true
})
export class PixelsPostfixPipe implements PipeTransform {

  transform(input: number): string {
    return `${input}px`;
  }

}
