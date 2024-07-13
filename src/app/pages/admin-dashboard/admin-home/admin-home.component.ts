import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SetupService } from 'src/app/core/services/setup.service';
import {
  AdminDashboardInformation,
  DailyRevenue,
  OrderCountStatistic,
} from 'src/app/core/models/statistic';
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
  orderCountStatistic!: OrderCountStatistic;
  dailyRevenue!: DailyRevenue[];
  adi!: AdminDashboardInformation;

  constructor(
    private setupService: SetupService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setupService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
    this.adi = {
      totalPlatformRevenue: 10000000,
      totalProductCount: 111,
      totalShopCount: 112,
      totalOrderCount: 113,
    };
    this.orderCountStatistic = {
      completedCount: 15,
      processingCount: 5,
      confirmedCount: 10,
      canceledCount: 2,
    };

    this.dailyRevenue = [
      { date: '2023-07-01', totalRevenue: 1000 },
      { date: '2023-07-02', totalRevenue: 1500 },
      { date: '2023-07-03', totalRevenue: 2000 },
      { date: '2023-07-04', totalRevenue: 2500 },
      { date: '2023-07-05', totalRevenue: 3000 },
      { date: '2023-07-06', totalRevenue: 3500 },
      { date: '2023-07-07', totalRevenue: 4000 },
    ];
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
