import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private auth: AuthService, private userStore: UserStoreService) {
  }

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  closeCallback(e: Event): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;


  ngOnInit(): void {
    this.getSessionUserInformation();
  }

  private getSessionUserInformation(){
    this.userStore.getUsernameFromStore()
    .subscribe(val => {
      let usernameFromToken = this.auth.getUsernameFromToken();
      this.username = val || usernameFromToken
    })

    this.userStore.getRoleFromStore().subscribe(val => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

    this.userStore.getImgPathFromStore().subscribe(val => {
      const imgPath = this.auth.getImgPathFromToken();
      this.imgPath = val || imgPath;
    })
  }

  // isLinkActive(url: string): boolean {
  //   return this.router.isActive(url, true);
  // }

  // navigateToHome(): void {
  //   this.router.navigate(['/home']);
  // }
}
