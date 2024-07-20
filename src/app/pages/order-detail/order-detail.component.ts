import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
import { GetOrderDto } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  order!: GetOrderDto;
  totalDays: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.orderService
      .getOrderById(parseInt(orderId!, 10))
      .subscribe(res => {
        this.order = res;
        this.checkPagePermisson();
        this.calculateTotalDays();
      });
  }

  checkPagePermisson() {
    const userId = this.authService.getUserIdFromToken();
    if (this.order.userId != userId) {
      this.router.navigate(['home'])
    }
  }

  calculateTotalDays() {
    if (this.order.contracts[0].startDate && this.order.contracts[0].endDate) {
      const startDate = new Date(this.order.contracts[0].startDate);
      const endDate = new Date(this.order.contracts[0].endDate);
      const timeDifference = endDate.getTime() - startDate.getTime();
      this.totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      this.totalDays += 1;
    }
  } 
}
