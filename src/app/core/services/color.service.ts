import { Injectable, signal } from '@angular/core';
import { colorsPalette } from '../constants/colors-palette.constant';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  colors: string[] = [
    colorsPalette.blue,
    colorsPalette.mulberry,
    colorsPalette.magenta,
  ];
  currentColorIndex = 0;
  currentColor: string = this.colors[this.currentColorIndex];
  color = signal<string>(this.colors[this.currentColorIndex]);

  getNextColor(): string {
    this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    return this.colors[this.currentColorIndex];
  }

  setColor(): void {
    this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    this.color.update(() => this.colors[this.currentColorIndex]);
  }
}
