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
    <h1 class="title">
      <div class="row" [style.color]="primaryColor">
        <span class="primary-text">Software Engineer</span>
      </div>
      <div class="row">
        <span class="focus secondary-text" [style.color]="secondaryColor"
          >Focused</span
        >
        <span class="space">&nbsp;</span>
        <div class="primary-text typing" [style.color]="primaryColor"></div>
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

  get secondaryColor(): string {
    return this.color;
  }
}
