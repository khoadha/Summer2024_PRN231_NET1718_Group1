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
  order!: GetOrderDto;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService
      .getOrderById(orderId)
      .toPromise()
      .then((res) => {
        this.order = res!;
        console.log(this.order);
      })
      .catch((error) => {});
  }
}
