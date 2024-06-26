import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStoreService } from '../../core/services/user-store.service';
import { RoomCategoryService } from 'src/app/core/services/room-category.service';
import { RoomCategory } from 'src/app/core/models/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    private categoriesService: RoomCategoryService) { }
    
  public username!: string;
  public userId!: string;
  public role!: string;
  imgPath!: string;
  categories: RoomCategory[] = [];

  ngOnInit(): void {
    this.getSessionUserInformation();
    this.categoriesService.getRoomCategories().subscribe(res => {
      this.categories = res;
    })
  }

  private getSessionUserInformation() {
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
    if (this.role == "User") {
      this.userStore.getUserIdFromStore().subscribe(val => {
        const usId = this.auth.getUserIdFromToken();
        this.userId = val || usId;
      });
    }
  }

  onClickHeaderCategory(categoryName: string){
    sessionStorage.setItem('selectedHeaderCategory', categoryName);
    window.location.href = '/all-room'
  }

  onClickAllRooms() {
window.location.href = '/all-room'
  }

  logOut() {
    this.auth.logOut();
  }
}
