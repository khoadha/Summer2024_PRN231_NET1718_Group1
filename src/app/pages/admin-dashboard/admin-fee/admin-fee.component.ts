import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GetFeeDto } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-admin-fee',
  templateUrl: './admin-fee.component.html',
  styleUrls: ['./admin-fee.component.css']
})
export class AdminFeeComponent implements OnInit {
  fees!: GetFeeDto[];
  electricityPrices: any[] = [
    { step: 'First 50 kWh', range: '0 - 50 kWh', priceUSD: 0.078 },
    { step: 'Next 50 kWh', range: '51 - 100 kWh', priceUSD: 0.081 },
    { step: 'Next 100 kWh', range: '101 - 200 kWh', priceUSD: 0.094 },
    { step: 'Next 100 kWh', range: '201 - 300 kWh', priceUSD: 0.119 },
    { step: 'Next 100 kWh', range: '301 - 400 kWh', priceUSD: 0.133 },
    { step: 'Above 400 kWh', range: '401+ kWh', priceUSD: 0.137 },
  ];

  constructor(
    private messageService: MessageService,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.orderService.getDeferredElectricityFee().subscribe(res => {
      this.fees = res;
    });
  }

  onSubmitFees(){
    const filteredFees = this.fees
      .filter(fee => fee.amount > 0)
      .map(fee => ({ id: fee.id, amount: fee.amount }));

    this.orderService.updateAmountFees({ children: filteredFees }).subscribe(res => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Submit data successfully!'});
      this.fees = res;
    });
  }

  calculateAmount(kWh: number): number {
    let amount = 0;
    let remainingKWh = kWh;

    for (const price of this.electricityPrices) {
      if (remainingKWh <= 0) break;
      let stepKWh = 0;
      if (price.range.includes(' - ')) {
        const ranges = price.range.split(' - ');
        const lower = parseInt(ranges[0], 10);
        const upper = parseInt(ranges[1], 10);
        stepKWh = upper - lower + 1;
        if (remainingKWh < stepKWh) {
          stepKWh = remainingKWh;
        }
      } else if (price.range.includes('+')) {
        stepKWh = remainingKWh;
      }
      amount += stepKWh * price.priceUSD;
      remainingKWh -= stepKWh;
    }
    return amount;
  }

  updateAmount(fee: GetFeeDto, kWh: number) {
    fee.amount = this.calculateAmount(kWh);
  }
}
