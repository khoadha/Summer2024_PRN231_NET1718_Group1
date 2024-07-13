import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { GetOrderDto } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { AddReportDto } from 'src/app/core/models/report';
import { ReportService } from 'src/app/core/services/report.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css'],
})
export class ManageOrderComponent implements OnInit {
  orders: GetOrderDto[] = [];
  selectedOrder!: GetOrderDto;
  description: string = '';
  showModal: boolean = false;
  header: string = '';

  displayedColumns: string[] = [
    'id',
    'roomId',
    'userId',
    'userName',
    'roomName',
    'orderDate',
    'cancelDate',
  ];
  constructor(
    private orderService: OrderService,
    private reportService: ReportService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }
  onClickReport(order: GetOrderDto) {
    this.selectedOrder = order;
    this.header = `Create report of room ${this.selectedOrder.roomName} (#${this.selectedOrder.roomId})`;
    this.showModal = true;
  }

  createReport() {
    let dto: AddReportDto = {
      roomId: this.selectedOrder.roomId,
      authorId: this.selectedOrder.userId!,
      description: this.description,
    };
    this.reportService.addReport(dto).subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Created report successfully!',
        });
        this.showModal = false;
        this.description = '';
      }
    });
  }

  getOrders(): void {
    const userId = this.authService.getUserIdFromToken();
    this.orderService
      .getOrdersByUserId(userId)
      .subscribe((orders) => (this.orders = orders));
  }
}
