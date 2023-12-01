import { Injectable, inject } from '@angular/core';
import { WindowService } from './window.service';

enum Browser {
  Chrome = 'Chrome',
  Safari = 'Safari',
}

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private windowService: WindowService = inject(WindowService);
  private userAgentString: string = this.windowService.getWindow()!.navigator.userAgent!;

  isChromeAgent: boolean = this.isBrowser(Browser.Chrome);
  isSafariAgent: boolean = this.isBrowser(Browser.Safari) && !this.isChromeAgent;

  private isBrowser(browserName: string): boolean {
    return this.userAgentString.indexOf(browserName) > -1;
  }
}
