import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  NgZone,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { ColorService } from "../../../services/color.service";
import { transparentColor } from "../../../constants/colors-palette.constant";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import HomePageComponent from "../../../pages/home-page/home-page.component";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  template: `
    <main>
      <router-outlet (activate)="onOutletLoaded($event)"></router-outlet>
    </main>
    <app-footer [color]="color"></app-footer>
  `,
  styleUrl: "./layout.component.less",
})
export default class LayoutComponent {
  private destroyRef = inject(DestroyRef);
  private ngZone: NgZone = inject(NgZone);
  private colorService: ColorService = inject(ColorService);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  color: string = transparentColor;

  onOutletLoaded(component: HomePageComponent) {
    this.ngZone.runOutsideAngular(() => {
      this.colorService
        .getColor()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((color) => {
          this.color = color;
          this.changeDetectorRef.detectChanges();

          component.color = this.color;
          component.changeDetectorRef.detectChanges();
        });
    });
  }
}
