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
    { name: 'Dashboard', url: '/adashboard', icon: 'pi-home' },
    { name: 'Room Category', url: '/adashboard/manage-room-category', icon: 'pi-book' },
    { name: 'Furniture', url: '/adashboard/manage-furniture', icon: 'pi-cart-arrow-down' },
    { name: 'Room', url: '/adashboard/manage-room', icon: 'pi-warehouse' },
    { name: 'Service', url: '/adashboard/manage-service', icon: 'pi-shopping-bag' },
    { name: 'Order', url: '/adashboard/#', icon: 'pi-box' },
    { name: 'Transaction', url: '/adashboard/#', icon: 'pi-credit-card' },
  ];

  constructor(private router: Router, private auth: AuthService, private userStore: UserStoreService) {
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
