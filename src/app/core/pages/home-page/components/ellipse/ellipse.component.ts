import { Component, input } from "@angular/core";

import { BROWSER } from "../../../../enums/browser.enum";

@Component({
    selector: "app-ellipse",
    imports: [],
    template: `
    <div
      class="ellipse"
      [class]="browser()"
      [style.background-color]="color()"
    ></div>
  `,
    styleUrl: "./ellipse.component.less"
})
export class EllipseComponent {
  readonly color = input.required<string>();
  readonly browser = input.required<BROWSER>();
}
