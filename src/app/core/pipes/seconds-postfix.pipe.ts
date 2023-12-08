import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "secondsPostfix",
  standalone: true,
})
export class SecondsPostfixPipe implements PipeTransform {
  private cachedValue: string | null = null;
  private lastInput: number = -1;

  transform(input: number): string {
    if (this.cachedValue === null || input !== this.lastInput) {
      this.lastInput = input;
      this.cachedValue = `${input}s`;
    }
    return this.cachedValue;
  }
}
