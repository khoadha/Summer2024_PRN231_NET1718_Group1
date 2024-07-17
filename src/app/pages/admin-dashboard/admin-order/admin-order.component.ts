import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetOrderDto } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
  providers: [DatePipe],
})
export class AdminOrderComponent implements OnInit {
  orderData: GetOrderDto[] = [];
  selectedOrder!: GetOrderDto;
  isModalOpen: boolean = false;
  
  constructor(
    private datePipe: DatePipe,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.initFurniture();
  }

  initFurniture() {
    this.orderService.getOrders().subscribe(res => {
      this.orderData = res;
    });
  }

  showDialog(order: GetOrderDto) {
    this.selectedOrder = order;
    this.transformData();
    this.isModalOpen = true;
  }
  
  transformData() {
    if (this.selectedOrder.orderDate != null) {
      this.selectedOrder.orderDate = this.datePipe.transform(
        this.selectedOrder.orderDate,
        'yyyy-MM-dd'
      );
    }

    if (this.selectedOrder.cancelDate != null) {
      this.selectedOrder.cancelDate = this.datePipe.transform(
        this.selectedOrder.cancelDate,
        'yyyy-MM-dd'
      );
    }

    
  }

}
