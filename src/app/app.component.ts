import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SvgComponent } from './core/components/svg/svg.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SvgComponent, HttpClientModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
