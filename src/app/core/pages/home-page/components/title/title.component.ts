import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  colorsPalette,
  transparentColor,
} from "../../../../constants/colors-palette.constant";

@Component({
  selector: "app-title",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>
      <div class="row" [style.color]="primaryColor">Software Engineer</div>
      <div class="row">
        <span class="focus" [style.color]="color">Focused</span>&nbsp;
        <div [style.color]="primaryColor" class="typing"></div>
      </div>
    </h1>
  `,
  styleUrl: "./title.component.less",
})
export class TitleComponent {
  @Input({ required: true }) color!: string;
  get primaryColor(): string {
    return this.color === transparentColor
      ? transparentColor
      : colorsPalette.white;
  }
}
