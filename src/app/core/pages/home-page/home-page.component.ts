import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  NgZone,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SvgComponent } from "./components/svg/svg.component";
import { TitleComponent } from "./components/title/title.component";
import { SemispheresComponent } from "./components/semispheres/semispheres.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ColorService } from "../../services/color.service";
import { FooterComponent } from "../../shared/ui/footer/footer.component";
import { DocumentService } from "../../services/document.service";
import { BehaviorSubject, takeWhile } from "rxjs";
import { BrowserService } from "../../services/browser.service";
import { BROWSER } from "../../enums/browser.enum";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [CommonModule, SvgComponent, TitleComponent, SemispheresComponent],
  providers: [FooterComponent],
  template: `
    <div class="page">
      <div class="page_title">
        <app-title [color]="color"></app-title>
      </div>
      <div class="page_semispheres">
        <app-semispheres
          [isActive]="isTabActive"
          [color]="color"
          [browser]="browser"
        ></app-semispheres>
      </div>
    </div>
  `,
  styleUrl: "./home-page.component.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {
  isTabActive: boolean = true;
  private destroyRef = inject(DestroyRef);
  private ngZone: NgZone = inject(NgZone);
  private colorService: ColorService = inject(ColorService);
  private documentService: DocumentService = inject(DocumentService);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _color: string = this.colorService.color;
  private documentTrigger = new BehaviorSubject(this.isTabActive);
  private browserService: BrowserService = inject(BrowserService);
  browser: BROWSER = this.browserService.detectBrowserName();

  constructor() {
    this.startColorIterator();

    this.documentService.visibilityChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isVisible) => {
        isVisible ? this.resumeColorUpdate() : this.stopColorUpdate();
        this.changeDetectorRef.detectChanges();
      });
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this.colorService.color = value;
    this._color = this.colorService.color;
    this.changeDetectorRef.detectChanges();
  }

  private startColorIterator(): void {
    this.ngZone.runOutsideAngular(() => {
      this.colorService
        .colorIterator()
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          takeWhile(() => this.documentTrigger.getValue())
        )
        .subscribe((color) => (this.color = color));
    });
  }

  private stopColorUpdate(): void {
    this.isTabActive = false;
    this.documentTrigger.next(this.isTabActive);
  }

  private resumeColorUpdate(): void {
    this.isTabActive = true;
    this.documentTrigger.next(this.isTabActive);
    this.startColorIterator();
  }
}
