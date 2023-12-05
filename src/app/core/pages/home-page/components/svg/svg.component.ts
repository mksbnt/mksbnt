import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ILinearGradient, IPath } from "../../../../interfaces/svg.interface";
import { separateArray } from "../../../../utils/separate-array.util";
import { SVG } from "../../../../constants/svg.constant";
import { SecondsPostfixPipe } from "../../../../pipes/seconds-postfix.pipe";

@Component({
  selector: "app-svg",
  standalone: true,
  imports: [CommonModule, SecondsPostfixPipe],
  template: `
    <svg
      class="svg"
      width="2000"
      height="1766"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke-miterlimit="10">
        @for (p of largerHemisphere; track p; let i = $index, c = $count, e =
        $even) { @if (i === 0) {
        <path
          class="path"
          [attr.stroke]="p.stroke"
          [attr.stroke-width]="p.strokeWidth"
          [attr.d]="p.d"
          [attr.opacity]="p.opacity"
        >
          @if (isActive) {
          <animate
            attributeName="d"
            [attr.dur]="largerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            [attr.values]="getIncrementedValues(largerHemisphere, i)"
          />
          <animate
            attributeName="opacity"
            [attr.dur]="largerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            values="0;1"
          />
          }
        </path>
        } @if (i > 0 && i < c - 3) {
        <path
          class="path"
          [attr.stroke]="p.stroke"
          [attr.stroke-width]="p.strokeWidth"
          [attr.d]="p.d"
          [attr.opacity]="p.opacity"
        >
          @if (isActive) {
          <animate
            attributeName="d"
            [attr.dur]="largerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            [attr.values]="getIncrementedValues(largerHemisphere, i)"
          />
          }
        </path>

        } @if (i === c - 3) {
        <path
          class="path"
          [attr.stroke]="p.stroke"
          [attr.stroke-width]="p.strokeWidth"
          [attr.d]="p.d"
          [attr.opacity]="p.opacity"
        >
          @if (isActive) {
          <animate
            attributeName="d"
            [attr.dur]="largerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            [attr.values]="getDectementedValues(largerHemisphere, i)"
          />
          <animate
            attributeName="opacity"
            [attr.dur]="largerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            values="1;0"
          />
          }
        </path>
        } } @for (psh of smallerHemisphere; track psh; let ipsh = $index, cpsh =
        $count) { @if (ipsh === 1) {
        <path
          [attr.stroke]="psh.stroke"
          [attr.stroke-width]="psh.strokeWidth"
          [attr.d]="psh.d"
          [attr.opacity]="psh.opacity"
        >
          @if (isActive) {
          <animate
            attributeName="d"
            [attr.dur]="smallerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            [attr.values]="getIncrementedValues(smallerHemisphere, ipsh)"
          />

          <animate
            attributeName="opacity"
            [attr.dur]="smallerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            values="1;0"
          />
          }
        </path>
        } @if (ipsh > 1 && ipsh < cpsh - 2 ) {
        <path
          [attr.stroke]="psh.stroke"
          [attr.stroke-width]="psh.strokeWidth"
          [attr.d]="psh.d"
          [attr.opacity]="psh.opacity"
        >
          @if (isActive) {
          <animate
            attributeName="d"
            [attr.dur]="smallerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            [attr.values]="getDectementedValues(smallerHemisphere, ipsh)"
          />
          }
        </path>
        } @if (ipsh === cpsh - 1) {
        <path
          [attr.stroke]="psh.stroke"
          [attr.stroke-width]="psh.strokeWidth"
          [attr.d]="psh.d"
          [attr.opacity]="psh.opacity"
        >
          @if (isActive) {
          <animate
            attributeName="d"
            [attr.dur]="smallerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            [attr.values]="getDectementedValues(smallerHemisphere, ipsh)"
          />
          <animate
            attributeName="opacity"
            [attr.dur]="smallerHemisphereAnimationDuration | secondsPostfix"
            repeatCount="indefinite"
            values="0;1"
          />
          }
        </path>
        } }
      </g>
      <defs>
        @for (l of linearGradient; track l) {
        <linearGradient
          [attr.id]="l.id"
          [attr.x1]="l.x1"
          [attr.x2]="l.x2"
          [attr.y1]="l.y1"
          [attr.y2]="l.y2"
          [attr.gradientUnits]="l.gradientUnits"
          gradientTransform="rotate(24)"
        >
          @for (s of l.stop; track s; let first = $first) { @if (s.stopOpacity)
          {
          <stop [attr.offset]="s.offset" [attr.stop-opacity]="s.stopOpacity" />
          } @if (s.stopColor) {
          <stop
            class="stop-color-transition"
            [attr.offset]="s.offset"
            [attr.stop-color]="color"
          />
          } }
        </linearGradient>
        }
      </defs>
    </svg>
  `,
  styleUrl: "./svg.component.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  getDectementedValues(arr: IPath[], index: number): string {
    return `${arr[index].d}; ${arr[index - 2].d}`;
  }
}
