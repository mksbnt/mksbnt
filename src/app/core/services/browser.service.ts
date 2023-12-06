import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { BROWSER, USER_AGENT_ID } from "../enums/browser.enum";
import { BrowserDetectionCache } from "../types/browser-detection-cache.type";

@Injectable({
  providedIn: "root",
})
export class BrowserService {
  private readonly document: Document = inject(DOCUMENT);
  private readonly platformId: Object = inject(PLATFORM_ID);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  private readonly userAgentString: string = this.document.defaultView!.navigator.userAgent!.toLowerCase();
  private browserDetectionCache: BrowserDetectionCache = {};

  detectBrowserName(agentString: string = this.userAgentString): BROWSER {
    if (this.browserDetectionCache.hasOwnProperty(agentString)) {
      return this.browserDetectionCache[agentString];
    }

    switch (this.isBrowser) {
      case agentString.indexOf(BROWSER.EDGE) > -1:
        this.browserDetectionCache[agentString] = BROWSER.EDGE;
        return BROWSER.EDGE;
      case agentString.indexOf(USER_AGENT_ID.OPERA) > -1:
        this.browserDetectionCache[agentString] = BROWSER.OPERA;
        return BROWSER.OPERA;
      case agentString.indexOf(BROWSER.CHROME) > -1:
        this.browserDetectionCache[agentString] = BROWSER.CHROME;
        return BROWSER.CHROME;
      case agentString.indexOf(USER_AGENT_ID.IE) > -1:
        this.browserDetectionCache[agentString] = BROWSER.IE;
        return BROWSER.IE;
      case agentString.indexOf(BROWSER.FIREFOX) > -1:
        this.browserDetectionCache[agentString] = BROWSER.FIREFOX;
        return BROWSER.FIREFOX;
      case agentString.indexOf(BROWSER.SAFARI) > -1:
        this.browserDetectionCache[agentString] = BROWSER.SAFARI;
        return BROWSER.SAFARI;
      default:
        this.browserDetectionCache[agentString] = BROWSER.OTHER;
        return BROWSER.OTHER;
    }
  }
}
