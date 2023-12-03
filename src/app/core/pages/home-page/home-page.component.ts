import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SvgComponent } from "../../components/svg/svg.component";
import { setColor } from "../../utils/color.util";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [CommonModule, SvgComponent],
  template: `
    <h1>
      Software Engineer<br />
      <div class="typing"></div>
    </h1>

    <div class="svg_wrapper">
      <div class="svg_ellipse" [style.background-color]="currentColor"></div>
      <app-svg [color]="currentColor" class="svg"></app-svg>
    </div>
  `,
  styleUrl: "./home-page.component.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {
  @Input({ required: true }) color!: string;
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  get currentColor(): string {
    return setColor(this.color);
  }
}
