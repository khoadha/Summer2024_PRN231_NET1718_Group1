import { ScrollService } from './core/services/scroll.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hosteland';
  hideElements: boolean = false;

  constructor(private router: Router, private scrollService: ScrollService) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideElements = this.router.url.includes('/mdashboard') || this.router.url.includes('adashboard');
      }
    });
 }
}
