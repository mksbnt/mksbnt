import { EventEmitter, Injectable } from "@angular/core";
import {
  colorsPalette,
  transparentColor,
} from "../constants/colors-palette.constant";
import { Observable, timer, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ColorService {
  private colors: string[] = [
    colorsPalette.blue,
    colorsPalette.mulberry,
    colorsPalette.magenta,
  ];
  private colorIndex: number = 0;
  private _color: string = transparentColor;
  currentColorChanged: EventEmitter<string> = new EventEmitter<string>();

  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color;
    this.currentColorChanged.emit(this.color);
  }

  colorIterator(): Observable<string> {
    return timer(0, 3000).pipe(
      map(() => {
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
        return this.colors[this.colorIndex];
      })
    );
  }
}
