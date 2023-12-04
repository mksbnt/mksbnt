import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SvgComponent } from "../svg/svg.component";
import { EllipseComponent } from "../ellipse/ellipse.component";

@Component({
  selector: "app-semispheres",
  standalone: true,
  imports: [CommonModule, SvgComponent, EllipseComponent],
  template: `
    <app-ellipse [color]="color"></app-ellipse>
    <app-svg [color]="color"></app-svg>
  `,
  styleUrl: "./semispheres.component.less",
})
export class SemispheresComponent {
  @Input({ required: true }) color!: string;
}
