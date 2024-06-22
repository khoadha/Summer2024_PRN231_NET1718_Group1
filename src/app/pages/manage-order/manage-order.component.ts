import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { GetOrderDto } from 'src/app/core/models/order';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css'],
})
export class ManageOrderComponent implements OnInit {
  orders: GetOrderDto[] = [];
  displayedColumns: string[] = [
    'id',
    'roomId',
    'userId',
    'userName',
    'roomName',
    'orderDate',
    'cancelDate',
  ];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe((orders) => (this.orders = orders));
  }
}
