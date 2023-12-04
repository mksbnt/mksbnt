import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ellipse',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="ellipse" [style.background-color]="color"></div>
  `,
  styleUrl: './ellipse.component.less'
})
export class EllipseComponent {
  @Input({ required: true }) color!: string;
}
