import { AfterViewInit, Component, DestroyRef, inject, DOCUMENT } from "@angular/core";

import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { DocumentService } from "../../../services/document.service";
import { DOCUMENT_VISIBILITY } from "../../../enums/document-visibility.enum";
import { fromEvent } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-layout",
    imports: [RouterOutlet, FooterComponent],
    template: `
    <div class="wrapper">
      <main class="main">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
    styleUrl: "./layout.component.less"
})
export default class LayoutComponent implements AfterViewInit {
  private destroyRef = inject(DestroyRef);
  private documentService: DocumentService = inject(DocumentService);
  private readonly document: Document = inject(DOCUMENT);
  private readonly visibilityChange$ = fromEvent(
    this.document,
    "visibilitychange"
  ).pipe(takeUntilDestroyed(this.destroyRef));

  ngAfterViewInit(): void {
    this.visibilityChange$.subscribe((event: Event) => {
      this.documentService.visibility =
        (event.target as Document).visibilityState ===
        DOCUMENT_VISIBILITY.HIDDEN
          ? false
          : true;
    });
  }
}
