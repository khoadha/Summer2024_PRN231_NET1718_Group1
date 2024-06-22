import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { GetOrderDto } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';

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
  constructor(private orderService: OrderService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    const userId = this.authService.getUserIdFromToken();
    this.orderService.getOrdersByUserId(userId).subscribe((orders) => (this.orders = orders));
  }
}
