import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SvgComponent } from "../svg/svg.component";
import { EllipseComponent } from "../ellipse/ellipse.component";
import { BROWSER } from "../../../../enums/browser.enum";

@Component({
  selector: "app-semispheres",
  standalone: true,
  imports: [CommonModule, SvgComponent, EllipseComponent],
  template: `
    <app-ellipse [browser]="browser" [color]="color"></app-ellipse>
    <app-svg [isActive]="isActive" [color]="color"></app-svg>
  `,
  styleUrl: "./semispheres.component.less",
})
export class SemispheresComponent {
  @Input({ required: true }) color!: string;
  @Input({ required: true }) isActive!: boolean;
  @Input({ required: true }) browser!: BROWSER;
}
