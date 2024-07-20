import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetFeeDto } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-fee-detail',
  templateUrl: './fee-detail.component.html',
  styleUrls: ['./fee-detail.component.css']
})
export class FeeDetailComponent implements OnInit {
  fees: GetFeeDto[] = [];
  selectedFeeIds: number[] = [];
  orderId: string = '';
  selectAllChecked: boolean = false;

  electricityPrices: any[] = [
    { step: 'First 50 kWh', range: '0 - 50 kWh', priceUSD: 0.078 },
    { step: 'Next 50 kWh', range: '51 - 100 kWh', priceUSD: 0.081 },
    { step: 'Next 100 kWh', range: '101 - 200 kWh', priceUSD: 0.094 },
    { step: 'Next 100 kWh', range: '201 - 300 kWh', priceUSD: 0.119 },
    { step: 'Next 100 kWh', range: '301 - 400 kWh', priceUSD: 0.133 },
    { step: 'Above 400 kWh', range: '401+ kWh', priceUSD: 0.137 },
  ];


  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const userId = this.authService.getUserIdFromToken();
    const orderId = this.route.snapshot.paramMap.get('id');
    this.orderId = orderId!;
    this.orderService.getFeeByOrderId(parseInt(orderId!, 10), userId).subscribe(res => {
      this.fees = res;
    });
  }

  onFeeSelectionChange(feeId: number, isSelected: boolean) {
    if (isSelected) {
      this.selectedFeeIds.push(feeId);
    } else {
      const index = this.selectedFeeIds.indexOf(feeId);
      if (index > -1) {
        this.selectedFeeIds.splice(index, 1);
      }
    }
    this.updateSelectAllCheckbox();
  }

  onFeeSelectionAllChange(isSelected: boolean) {
    this.selectedFeeIds = isSelected ? this.fees.map(fee => fee.id) : [];
    this.updateSelectAllCheckbox();
  }

  updateSelectAllCheckbox() {
    this.selectAllChecked = this.selectedFeeIds.length === this.fees.length;
  }

  paySelectedFees() {
    const userId = this.authService.getUserIdFromToken();
    if (this.selectedFeeIds.length > 0) {
      const createPaymentRequest = { description: "string", feeIds: this.selectedFeeIds };
      this.orderService.createPayment(createPaymentRequest, userId).subscribe(res => {
        window.location.href = res.url;
      }
      );
    }
  }
}
