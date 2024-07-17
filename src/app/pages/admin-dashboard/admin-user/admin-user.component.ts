import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { SetupService } from 'src/app/core/services/setup.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
  providers: [MessageService]
})
export class AdminUserComponent implements OnInit {

  users: any[] = [];
  isStaff: any;
  isLoading: boolean = false;

  constructor(private messageService: MessageService, private auth: AuthService, private setupService: SetupService) {
  }

  ngOnInit(): void {
    this.isStaff = this.auth.getIsStaffFromToken();
    this.fetchUserData()
  }

  fetchUserData() {
    this.isLoading = true;
    this.setupService.getAllUsers().subscribe(res => {
      this.users = res;
    })
    this.isLoading = false;
  }

  updateRole(userId: string, action: number) {
    this.setupService.updateUserRole(userId, action).subscribe(res => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Update success', detail: 'Update role successfully!' });
        this.fetchUserData()
      }
    })
  }
}
