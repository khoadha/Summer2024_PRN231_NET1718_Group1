import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetReportDto, UpdateReportDto } from 'src/app/core/models/report';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css'],
  providers: [DatePipe],
})
export class AdminReportComponent implements OnInit {
  reports: GetReportDto[] = [];
  selectedReport!: GetReportDto;
  updateReportDto!: UpdateReportDto;
  loading: boolean = false;
  showModal: boolean = false;
  options: any;
  header: string = '';

  constructor(
    private reportService: ReportService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setLoading(true);
    this.fetchReportsData();
    this.initDto();
    this.initOptions();
  }

  fetchReportsData() {
    this.setLoading(true);
    this.reportService.getReports().subscribe((res) => {
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

  updateReport() {
    this.setLoading(true);
    let dto: UpdateReportDto = {
      reply: this.updateReportDto.reply,
      status: this.updateReportDto.status,
    };
    this.reportService
      .updateReport(this.selectedReport.id, dto)
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update report successfully!',
        });
        this.fetchReportsData();
        this.setLoading(false);
        this.showModal = false;
      });
  }

  checkAvailableToUpdate(status: number): boolean {
    if (status === 0 || status === 3) {
      return false;
    } else if (status === 1 || status === 2) {
      return true;
    }
    return false;
  }

  initOptions() {
    this.options = [
      {
        label: 'Rejected',
        value: 0,
      },
      {
        label: 'Processing',
        value: 2,
      },
      {
        label: 'Complete',
        value: 3,
      },
    ];
  }

  initDto() {
    this.updateReportDto = {
      reply: '',
      status: 0,
    };
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
