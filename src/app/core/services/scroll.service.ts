import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  noScrollUrls: string[] = [
    'sign-in', 
    'sign-up',
    'room-detail'
  ];

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.handleScroll(event.urlAfterRedirects);
      }
    });
  }

  handleScroll(url: string): void {
    const shouldScrollToTop = this.shouldScrollToTop(url);

    if (shouldScrollToTop) {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  shouldScrollToTop(url: string): boolean {
    return !this.noScrollUrls.includes(url);
  }
}
