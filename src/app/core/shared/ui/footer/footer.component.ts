import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ColorService } from "../../../services/color.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-footer",
    imports: [CommonModule],
    template: `
    <footer>
      <a
        href="https://github.com/mksbnt/mksbnt"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github"
        [style]="style"
      >
        <span>Github</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          width="48"
          height="48"
          fill="#fff"
          viewBox="-143 145 512 512"
        >
          <path
            d="M177.1 398.4c-8.6-1.5-17.6-1.3-26.4-.8-20 1.1-40 3-60 1.2-9.5-.9-19.1-1.8-28.7-1.6-17.4.3-32 6-40.6 22.6-4.3 8.2-5.3 17-5 26.1.7 25.6 11.8 40.2 36.2 47.5 19.6 5.8 39.7 6.6 59.9 6.2 7.5 0 15 .4 22.5-.1 15.5-.9 30.7-3.2 45.4-8.6 15.2-5.6 24.3-16.3 27.6-31.8 1.3-6 1.9-12.3 1.8-18.4-.2-20.7-14.2-39.2-32.7-42.3zm-98.4 67.7c-6.5 7.1-15.9 7.2-22.6.3-4.9-5-7.7-12.7-7.7-22.3.2-6.5 2.1-13.6 7.7-19.3 6.7-6.9 16.1-6.8 22.6.2 9.8 10.6 9.8 30.5 0 41.1zm90.9.5c-6.1 6.3-14.9 6.5-21.4.7-11.2-10.2-11.2-32.9 0-43.2 6.4-5.9 15.2-5.7 21.4.6 5.7 5.8 7.6 13.1 7.9 20.9-.3 7.9-2.3 15.1-7.9 21z"
          />
          <path
            d="M329 145h-432c-22.1 0-40 17.9-40 40v432c0 22.1 17.9 40 40 40h432c22.1 0 40-17.9 40-40V185c0-22.1-17.9-40-40-40zm-84.8 278.4c-1.4 11.4-3.8 23.1-7.9 33.8-12 30.7-36 47.6-67.8 52.7-18.2 2.9-36.9 3-57.1 4.5-18.1-1.6-38-1.8-57.3-5.2-37.4-6.6-62.8-32.8-70.2-70.3-3.8-19.1-4.9-38.3 1-57.3 3.1-9.8 8.2-18.5 14.8-26.4.9-1 1.7-2.5 1.6-3.8-1.1-17.2.9-34.2 6-50.6 4.2-13.7 1.1-12.9 16.3-8.9 18.3 4.8 34.3 14.7 50 25 1.8 1.2 4.6 1.7 6.8 1.3 22.2-3.4 44.3-3.6 66.5.3 1.6.3 3.7-.3 5.2-1.2 13.5-8.8 27.4-16.7 42.6-22.2 5.5-2 11.3-3.3 16.9-5 2.5-.7 3.6.2 4.5 2.6 6.8 19 9.6 38.5 8.6 58.6-.1 1.1.5 2.6 1.2 3.5 17.1 19.8 21.4 43.4 18.3 68.6z"
          />
        </svg>
      </a>
    </footer>
  `,
    styleUrl: "./footer.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private destroyRef = inject(DestroyRef);
  private colorService: ColorService = inject(ColorService);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _color: string = this.colorService.color;

  constructor() {
    this.colorService.currentColorChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((color) => (this.color = color));
  }

  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color;
    this.changeDetectorRef.detectChanges();
  }

  get style(): string {
    return `background-color: ${this.color}; box-shadow: 0px 0px 14px 0px ${this.color};`;
  }
}
