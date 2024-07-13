import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetReportDto, UpdateReportDto } from 'src/app/core/models/report';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-my-report',
  templateUrl: './my-report.component.html',
  styleUrls: ['./my-report.component.css'],
  providers: [DatePipe],
})
export class MyReportComponent implements OnInit {
  reports: GetReportDto[] = [];
  selectedReport!: GetReportDto;
  updateReportDto!: UpdateReportDto;
  loading: boolean = false;
  showModal: boolean = false;
  options: any;
  header: string = '';

  constructor(
    private authService: AuthService,
    private reportService: ReportService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setLoading(true);
    this.fetchReportsData();
  }

  fetchReportsData() {
    const userId = this.authService.getUserIdFromToken();
    this.setLoading(true);
    this.reportService.getReportsByUserId(userId).subscribe((res) => {
      this.reports = res;
      this.setLoading(false);
    });
  }

  onOpenUpdateModal(id: number) {
    this.setLoading(true);
    this.reportService.getReportById(id).subscribe((res) => {
      this.selectedReport = res;
      this.header = `Update report #${this.selectedReport.id} with room ${this.selectedReport.roomName} (#${this.selectedReport.roomId})`;
      this.setLoading(false);
      this.transformData();
      this.showModal = true;
    });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  transformData() {
    if (this.selectedReport.reply == null) {
      this.selectedReport.reply = 'No data';
    }

    if (this.selectedReport.createdDate != null) {
      this.selectedReport.createdDate = this.datePipe.transform(
        this.selectedReport.createdDate,
        'yyyy-MM-dd'
      );
    } else {
      this.selectedReport.createdDate = 'No data';
    }
    if (this.selectedReport.startDate != null) {
      this.selectedReport.startDate = this.datePipe.transform(
        this.selectedReport.startDate,
        'yyyy-MM-dd'
      );
    } else {
      this.selectedReport.startDate = 'No data';
    }
    if (this.selectedReport.endDate != null) {
      this.selectedReport.endDate = this.datePipe.transform(
        this.selectedReport.endDate,
        'yyyy-MM-dd'
      );
    } else {
      this.selectedReport.endDate = 'No data';
    }
  }
}
