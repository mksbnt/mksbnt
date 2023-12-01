import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

// function getWindow(): any {
//   return window;
// }

// function getWindow(): Window | null {
//   if (typeof window !== 'undefined') {
//     return window;
//   }
//   return null;
// }

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  // get nativeWindow(): Window | null {
  //   return getWindow();
  // }

  constructor(@Inject(DOCUMENT) private _doc: Document) {}

  getWindow(): Window | null {
    return this._doc.defaultView;
  }

  getLocation(): Location {
    return this._doc.location;
  }

  createElement(tag: string): HTMLElement {
    return this._doc.createElement(tag);
  }
}
