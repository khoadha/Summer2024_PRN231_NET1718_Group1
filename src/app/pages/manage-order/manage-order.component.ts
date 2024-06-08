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
    console.log(this.orders);
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe((orders) => (this.orders = orders));
    this.orders = [
      {
        id: 1,
        roomId: 101,
        userId: 'user1',
        guests: [
          {
            id: 1,
            fullname: 'Guest One',
            email: 'guestone@example.com',
            birthday: new Date('1990-01-01'),
          },
        ],
        orderDate: new Date(),
        cancelDate: null,
        userName: 'John Doe',
        roomName: 'Room 101',
      },
      {
        id: 2,
        roomId: 102,
        userId: 'user2',
        guests: [
          {
            id: 2,
            fullname: 'Guest Two',
            email: 'guesttwo@example.com',
            birthday: new Date('1995-01-01'),
          },
        ],
        orderDate: new Date(),
        cancelDate: null,
        userName: 'Jane Doe',
        roomName: 'Room 102',
      },
    ];
  }
}
