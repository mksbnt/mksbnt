import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { DocumentService } from "../../../services/document.service";
import { DOCUMENT_VISIBILITY } from "../../../enums/document-visibility.enum";
import { fromEvent, map } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PixelsPostfixPipe } from "../../../pipes/pixels-postfix.pipe";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, PixelsPostfixPipe],
  // template: `
  //   <div
  //     class="wrapper"
  //     [style.width]="width | pixelsPostfix"
  //     [style.height]="height | pixelsPostfix"
  //   >
  //     <main class="main">
  //       <router-outlet></router-outlet>
  //     </main>
  //     <app-footer></app-footer>
  //   </div>
  // `,
  template: `
  <div class="wrapper">
    <main class="main">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  </div>
`,
  styleUrl: "./layout.component.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent implements AfterViewInit {
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private documentService: DocumentService = inject(DocumentService);
  private readonly document: Document = inject(DOCUMENT);
  private readonly window: Window = this.document.defaultView!.window;
  private readonly resize$ = fromEvent(this.window, "resize").pipe(
    takeUntilDestroyed(this.destroyRef),
    map((event) => {
      const { innerWidth: newWidth, innerHeight: newHeight } =
        event.target as Window;
      return { newWidth, newHeight };
    })
  );
  private readonly orientationChange$ = fromEvent(
    this.window,
    "orientationchange"
  ).pipe(takeUntilDestroyed(this.destroyRef));
  private readonly visibilityChange$ = fromEvent(
    this.document,
    "visibilitychange"
  ).pipe(takeUntilDestroyed(this.destroyRef));

  width: number = this.window.innerWidth ? this.window.innerWidth : 0;
  height: number = this.window.innerHeight ? this.window.innerHeight : 0;

  ngAfterViewInit(): void {
    // this.orientationChange$.subscribe(() => {
    //   const { width, height } = this;
    //   this.width = height;
    //   this.height = width;
    //   this.changeDetectorRef.markForCheck();
    // });

    // this.resize$.subscribe(({ newWidth, newHeight }) => {
    //   if (this.width !== newWidth) {
    //     this.width = newWidth;
    //     this.changeDetectorRef.markForCheck();
    //   }

    //   if (this.height !== newHeight) {
    //     this.height = newHeight;
    //     this.changeDetectorRef.markForCheck();
    //   }
    // });

    // this.visibilityChange$.subscribe((event: Event) => {
    //   this.documentService.visibility =
    //     (event.target as Document).visibilityState ===
    //     DOCUMENT_VISIBILITY.HIDDEN
    //       ? false
    //       : true;
    // });
  }
}
