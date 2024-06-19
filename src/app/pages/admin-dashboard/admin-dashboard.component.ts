import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit{
  public username!: string;
  public role!: string;
  imgPath!: string;

  drawerVisible: boolean = true;
  items: MenuItem[] = [
    { label: 'Dashboard', url: '/adashboard', icon: 'pi-chart-bar' },
    { label: 'Rooms', url: '/adashboard/manage-room', icon: 'pi-home' },
    { label: 'Furniture', url: '/adashboard/manage-furniture', icon: 'pi-desktop' },
    { label: 'Services', url: '/adashboard/manage-service', icon: 'pi-shopping-bag' },
    { label: 'Room Categories', url: '/adashboard/manage-room-category', icon: 'pi-book' },
    { label: 'Orders', url: '/adashboard/manage-order', icon: 'pi-box' },
    { label: 'Transactions', url: '/adashboard/manage-transaction', icon: 'pi-credit-card' },
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  isLinkActive(url: string): boolean {
    const options: IsActiveMatchOptions = {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored'
    };
    return this.router.isActive(url, options);
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
