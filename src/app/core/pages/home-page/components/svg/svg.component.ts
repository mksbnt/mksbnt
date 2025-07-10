import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ILinearGradient, IPath } from "../../../../interfaces/svg.interface";
import { separateArray } from "../../../../utils/separate-array.util";
import { SVG } from "../../../../constants/svg.constant";
import { SecondsPostfixPipe } from "../../../../pipes/seconds-postfix.pipe";

@Component({
    selector: "app-svg",
    imports: [CommonModule, SecondsPostfixPipe],
    templateUrl: "./svg.component.svg",
    styleUrl: "./svg.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgComponent {
  @Input({ required: true }) color!: string;
  @Input({ required: true }) isActive!: boolean;
  largerHemisphere!: IPath[];
  smallerHemisphere!: IPath[];
  linearGradient!: ILinearGradient[];
  largerHemisphereAnimationDuration: number = 2;
  smallerHemisphereAnimationDuration: number =
    this.largerHemisphereAnimationDuration * 0.75;

  constructor() {
    [this.largerHemisphere, this.smallerHemisphere] = separateArray(SVG.g.path);
    this.linearGradient = SVG.defs.linearGradient;
  }

  getIncrementedValues(arr: IPath[], index: number): string {
    return `${arr[index].d}; ${arr[index + 2].d}`;
  }

  getDecrementedValues(arr: IPath[], index: number): string {
    return `${arr[index].d}; ${arr[index - 2].d}`;
  }
}
