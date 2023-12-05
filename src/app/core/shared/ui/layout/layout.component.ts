import { Component, inject } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { DocumentService } from "../../../services/document.service";
import { DOCUMENT_VISIBILITY } from "../../../enums/document-visibility.enum";


@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: "./layout.component.less",
})
export default class LayoutComponent {
  private readonly document: Document = inject(DOCUMENT);
  private documentService: DocumentService = inject(DocumentService);

  constructor() {
    this.listenDocument(this.document);
  }

  listenDocument(document: Document): void {
    document.addEventListener("visibilitychange", () => {
      document.visibilityState === DOCUMENT_VISIBILITY.HIDDEN
        ? (this.documentService.visibility = false)
        : (this.documentService.visibility = true);
    });
  }
}
