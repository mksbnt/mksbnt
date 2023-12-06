import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BROWSER } from "../../../../enums/browser.enum";

@Component({
  selector: "app-ellipse",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="ellipse"
      [class]="browser"
      [style.background-color]="color"
    ></div>
  `,
  styleUrl: "./ellipse.component.less",
})
export class EllipseComponent {
  @Input({ required: true }) color!: string;
  @Input({ required: true }) browser!: BROWSER;
}
