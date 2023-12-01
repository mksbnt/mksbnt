import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPath } from '../../../interfaces/svg.interface';

@Component({
  selector: 'app-svg-path',
  standalone: true,
  imports: [CommonModule],
  // templateUrl: './svg-path.component.html',
  template: `
        <path
          [attr.stroke]="path.stroke"
          [attr.stroke-width]="path.strokeWidth"
          [attr.d]="path.d"
          [attr.opacity]="path.opacity"
        >
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            [attr.values]="getIncrementedValues(hemisphere, index)"
          />
        </path>
  `,
  styleUrl: './svg-path.component.less',
  schemas: [NO_ERRORS_SCHEMA],
})
export class SvgPathComponent {
  @Input({ required: true }) path!: IPath;
  @Input({ required: true }) index!: number;
  @Input({ required: true }) hemisphere!: IPath[];

  // getDectementedValues(arr: IPath[], index: number): string {
  //   return `${arr[index].d}; ${arr[index - 2].d}`;
  // }
  getIncrementedValues(arr: IPath[], index: number): string {
    return `${arr[index].d}; ${arr[index + 2].d}`;
  }


}
