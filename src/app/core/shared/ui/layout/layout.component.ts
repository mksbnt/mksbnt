import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  template: `
    <main><router-outlet></router-outlet></main>
    <app-footer></app-footer>
  `,
  styleUrl: './layout.component.less',
})
export default class LayoutComponent {}
