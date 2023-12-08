import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pixelsPostfix",
  standalone: true,
})
export class PixelsPostfixPipe implements PipeTransform {
  private cachedValue: string | null = null;
  private lastInput: number = -1;

  transform(input: number): string {
    if (this.cachedValue === null || input !== this.lastInput) {
      this.lastInput = input;
      this.cachedValue = `${input}px`;
    }
    return this.cachedValue;
  }
}
