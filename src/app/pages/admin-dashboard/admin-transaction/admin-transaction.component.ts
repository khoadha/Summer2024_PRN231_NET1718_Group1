import { Component, OnInit } from '@angular/core';
import { PaymentTransaction } from 'src/app/core/models/transaction';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.css']
})
export class AdminTransactionComponent implements OnInit {

  transactions!: PaymentTransaction[];

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.paymentService.getAllTransactions().subscribe(res => {
      this.transactions = res;
    })
  }
}
