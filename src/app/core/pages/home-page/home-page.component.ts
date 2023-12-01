import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgComponent } from '../../components/svg/svg.component';
import { map } from 'rxjs';
import { Subscription, timer } from 'rxjs';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, SvgComponent],
  template: `
    <h1>
      Software Engineer<br />
      <div class="typing"></div>
    </h1>

    <div class="svg_wrapper">
    <div class="svg_ellipse" [style.background-color]="color"></div>
      <app-svg [color]="color" class="svg"></app-svg>
    </div>
  `,
  styleUrl: './home-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent implements OnInit, OnDestroy {
  private ngZone: NgZone = inject(NgZone);
  private colorService: ColorService = inject(ColorService);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private timerSubscription!: Subscription;
  private setColor = (color: string) => this.color = color;
  color: string = 'transparent' //  colorsPalette.black;
  
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.timerSubscription = timer(0, 3000)
        .pipe(
          map(() => {
            this.colorService.setColor();
            this.setColor(this.colorService.color());
            this.changeDetectorRef.detectChanges();
          })
        )
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
