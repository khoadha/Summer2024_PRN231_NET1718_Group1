import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
import { GetOrderDto } from 'src/app/core/models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  orders!: GetOrderDto;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.getOrderById(orderId);
    console.log(this.orders);
  }

  getOrderById(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe((orders) => {
      if (orders && orders.length > 0) {
        this.orders = orders[0]; // assuming you want the first order if there are multiple
      }
    });
  }
}
