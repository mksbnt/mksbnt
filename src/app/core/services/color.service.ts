import { Injectable } from "@angular/core";
import { colorsPalette } from "../constants/colors-palette.constant";
import { Observable, timer, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ColorService {
  colors: string[] = [
    colorsPalette.blue,
    colorsPalette.mulberry,
    colorsPalette.magenta,
  ];
  currentColorIndex = 0;
  currentColor: string = this.colors[this.currentColorIndex];

  getColor(): Observable<string> {
    return timer(0, 3000).pipe(
      map(() => {
        this.currentColorIndex =
          (this.currentColorIndex + 1) % this.colors.length;
        return this.colors[this.currentColorIndex];
      })
    );
  }
}
