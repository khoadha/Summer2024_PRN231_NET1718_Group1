import { Component, OnInit } from '@angular/core';
import { GetOrderDto } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  orderData: GetOrderDto[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.initFurniture();
  }

  initFurniture() {
    this.orderService.getOrders().subscribe(res => {
      console.log("REAL"+res);
      
      this.orderData = res;
    });
  }
}
