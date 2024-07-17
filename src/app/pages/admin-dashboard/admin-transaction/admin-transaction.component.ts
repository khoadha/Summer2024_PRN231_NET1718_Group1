import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaymentTransaction } from 'src/app/core/models/transaction';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.css'],
  providers: [DatePipe],
})
export class AdminTransactionComponent implements OnInit {

  transactions!: PaymentTransaction[];
  selectedTransaction!: PaymentTransaction;
  selectedTransactionStatusText: string = '';
  isModalOpen: boolean = false;

  constructor(
    private datePipe: DatePipe,
    private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.paymentService.getAllTransactions().subscribe(res => {
      this.transactions = res;
    })
  }

  showDialog(trans: PaymentTransaction) {
    this.selectedTransaction = trans;
    this.transformData();
    this.isModalOpen = true;
  }

  transformData() {
    if (this.selectedTransaction.createdDate != null) {
      this.selectedTransaction.createdDate = this.datePipe.transform(
        this.selectedTransaction.createdDate,
        'yyyy-MM-dd'
      );
    }

    if(this.selectedTransaction.transactionStatus != null) {
      if(this.selectedTransaction.transactionStatus==0) {
        this.selectedTransactionStatusText = 'Pending';
      } else if(this.selectedTransaction.transactionStatus==1) {
        this.selectedTransactionStatusText = 'Success';
      } else if(this.selectedTransaction.transactionStatus==1) {
        this.selectedTransactionStatusText = 'Failed';
      }
    }
  }
}
