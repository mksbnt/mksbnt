import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  private _isVisible: boolean = true;
  visibilityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  get isVisible(): boolean {
    return this._isVisible;
  }

  set visibility(boolean: boolean) {
    this._isVisible = boolean;
    this.visibilityChanged.emit(this._isVisible);
  }
}
