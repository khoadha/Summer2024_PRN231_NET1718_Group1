import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SetupService } from 'src/app/core/services/setup.service';
import {
  AdminDashboardInformation,
  DailyRevenue,
  GetRoomAdminDisplayDTO,
} from 'src/app/core/models/statistic';
import { RoomService } from 'src/app/core/services/room.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { FurnitureService } from 'src/app/core/services/furniture.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  users: any[] = [];
  selectedUsers: any[] = [];
  content: string = '';
  subject: string = '';
  showModal: boolean = false;
  roomCountStatistic!: GetRoomAdminDisplayDTO;
  dailyRevenue!: DailyRevenue[];

  adi: AdminDashboardInformation = {
    totalRoomCount: 0,
    totalOrderCount: 0,
    totalFurnitureCount: 0,
    totalUserCount: 0,
  };
  constructor(
    private setupService: SetupService,
    private messageService: MessageService,
    private roomService: RoomService,
    private paymentService: PaymentService,
    private profileService: ProfileService,
    private furnitureService: FurnitureService
  ) {}

  ngOnInit(): void {
    this.setupService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
    this.paymentService.getTransactionsDataChart().subscribe((res) => {
      this.dailyRevenue = res;
    });

    this.paymentService.getTransactionsCount().subscribe((res) => {
      this.adi.totalOrderCount = res;
    });
    this.furnitureService.getFurnituresCount().subscribe((res) => {
      this.adi.totalFurnitureCount = res;
    });

    this.profileService.getProfileCount().subscribe((res) => {
      this.adi.totalUserCount = res;
    });

    this.roomService.getAdminRoomsInfo().subscribe((res) => {
      this.roomCountStatistic = res;
      this.adi.totalRoomCount = res.roomCount ?? 0;
    });

    // this.dailyRevenue = [
    //   { date: '2023-07-01', totalRevenue: 1000 },
    //   { date: '2023-07-02', totalRevenue: 1500 },
    //   { date: '2023-07-03', totalRevenue: 2000 },
    //   { date: '2023-07-04', totalRevenue: 2500 },
    //   { date: '2023-07-05', totalRevenue: 3000 },
    //   { date: '2023-07-06', totalRevenue: 3500 },
    //   { date: '2023-07-07', totalRevenue: 4000 },
    // ];
  }

  onSubmit() {
    const dto: any = {
      content: this.content,
      emails: this.selectedUsers,
      subject: this.subject,
    };
    this.setupService.sendEmail(dto).subscribe((res) => {});
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Send email request successfully!',
    });
    this.showModal = false;
    this.content = '';
    this.subject = '';
    this.selectedUsers = [];
  }

  onClickSendEmailButton() {
    this.showModal = true;
  }

  isDataValid() {
    const textContent = this.stripHtml(this.content).trim();
    return (
      this.selectedUsers.length >= 1 &&
      textContent !== '' &&
      this.subject.trim() != ''
    );
  }

  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
}
