import { Injectable, PLATFORM_ID, inject, DOCUMENT } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
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

  private readonly browserPatterns: ReadonlyArray<readonly [string, BROWSER]> = [
    [BROWSER.EDGE, BROWSER.EDGE],
    [USER_AGENT_ID.OPERA, BROWSER.OPERA],
    [BROWSER.CHROME, BROWSER.CHROME],
    [USER_AGENT_ID.IE, BROWSER.IE],
    [BROWSER.FIREFOX, BROWSER.FIREFOX],
    [BROWSER.SAFARI, BROWSER.SAFARI],
  ] as const;

  detectBrowserName(agentString: string = this.userAgentString): BROWSER {
    if (this.browserDetectionCache.hasOwnProperty(agentString)) {
      return this.browserDetectionCache[agentString];
    }

    if (!this.isBrowser) {
      this.browserDetectionCache[agentString] = BROWSER.OTHER;
      return BROWSER.OTHER;
    }

    const detectedBrowser = this.browserPatterns.find(([pattern]) =>
      agentString.includes(pattern)
    )?.[1] ?? BROWSER.OTHER;

    this.browserDetectionCache[agentString] = detectedBrowser;
    return detectedBrowser;
  }
}
