import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SvgComponent } from "./components/svg/svg.component";
import { transparentColor } from "../../constants/colors-palette.constant";
import { TitleComponent } from "./components/title/title.component";
import { SemispheresComponent } from "./components/semispheres/semispheres.component";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [CommonModule, SvgComponent, TitleComponent, SemispheresComponent],
  template: `
    <div class="page">
      <div class="page_title">
        <app-title [color]="color"></app-title>
      </div>
      <div class="page_semispheres">
        <app-semispheres [color]="color"></app-semispheres>
      </div>
    </div>
  `,
  styleUrl: "./home-page.component.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {
  color: string = transparentColor;
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
}
