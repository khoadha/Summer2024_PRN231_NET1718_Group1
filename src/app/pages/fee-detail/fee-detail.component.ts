import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFeeDto } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-fee-detail',
  templateUrl: './fee-detail.component.html',
  styleUrls: ['./fee-detail.component.css']
})
export class FeeDetailComponent implements OnInit{
  fees: GetFeeDto[] =[];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserIdFromToken();

    const orderId = this.route.snapshot.paramMap.get('id');
    this.orderService
    .getFeeByOrderId(parseInt(orderId!, 10), userId)
    .subscribe(res => {
      this.fees = res;
    });
  }
}
