import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ILinearGradient, IPath, ISVG } from '../../interfaces/svg.interface';
import { separateArray } from '../../utils/separate-array.util';
import { SVG } from '../../constants/svg.constant';
import { ColorService } from '../../services/color.service';
import { SvgPathComponent } from './svg-path/svg-path.component';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [CommonModule, SvgPathComponent],
  providers: [HttpClient, ColorService],
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
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            [attr.values]="getIncrementedValues(largerHemisphere, i)"
          />
          <animate
            attributeName="opacity"
            dur="2s"
            repeatCount="indefinite"
            values="0;1"
          />
        </path>
        } @if (i > 0 && i < c - 3) {
        <path
          class="path"
          [attr.stroke]="p.stroke"
          [attr.stroke-width]="p.strokeWidth"
          [attr.d]="p.d"
          [attr.opacity]="p.opacity"
        >
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            [attr.values]="getIncrementedValues(largerHemisphere, i)"
          />
        </path>

        } @if (i === c - 3) {
        <path
          class="path"
          [attr.stroke]="p.stroke"
          [attr.stroke-width]="p.strokeWidth"
          [attr.d]="p.d"
          [attr.opacity]="p.opacity"
        >
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            [attr.values]="getDectementedValues(largerHemisphere, i)"
          />
          <animate
            attributeName="opacity"
            dur="2s"
            repeatCount="indefinite"
            values="1;0"
          />
        </path>
        } } @for (psh of smallerHemisphere; track psh; let ipsh = $index, cpsh =
        $count) { @if (ipsh === 1) {
        <path
          [attr.stroke]="psh.stroke"
          [attr.stroke-width]="psh.strokeWidth"
          [attr.d]="psh.d"
          [attr.opacity]="psh.opacity"
        >
          <animate
            attributeName="d"
            dur="1.5s"
            repeatCount="indefinite"
            [attr.values]="getIncrementedValues(smallerHemisphere, ipsh)"
          />

          <animate
            attributeName="opacity"
            dur="1.5s"
            repeatCount="indefinite"
            values="1;0"
          />
        </path>
        } @if (ipsh > 1 && ipsh < cpsh - 2 ) {
        <path
          [attr.stroke]="psh.stroke"
          [attr.stroke-width]="psh.strokeWidth"
          [attr.d]="psh.d"
          [attr.opacity]="psh.opacity"
        >
          <animate
            attributeName="d"
            dur="1.5s"
            repeatCount="indefinite"
            [attr.values]="getDectementedValues(smallerHemisphere, ipsh)"
          />
        </path>
        } @if (ipsh === cpsh - 1) {
        <path
          [attr.stroke]="psh.stroke"
          [attr.stroke-width]="psh.strokeWidth"
          [attr.d]="psh.d"
          [attr.opacity]="psh.opacity"
        >
          <animate
            attributeName="d"
            dur="1.5s"
            repeatCount="indefinite"
            [attr.values]="getDectementedValues(smallerHemisphere, ipsh)"
          />
          <animate
            attributeName="opacity"
            dur="1.5s"
            repeatCount="indefinite"
            values="0;1"
          />
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
  styleUrl: './svg.component.less',
})
export class SvgComponent implements OnInit {
  @Input({ required: true }) color!: string;
  largerHemisphere!: IPath[];
  smallerHemisphere!: IPath[];
  linearGradient!: ILinearGradient[];

  ngOnInit(): void {
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
