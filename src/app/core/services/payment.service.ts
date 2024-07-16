import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { PaymentTransaction } from '../models/transaction';
import { Observable } from 'rxjs';
import { DailyRevenue } from '../models/statistic';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'Payments';

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<PaymentTransaction[]> {
    return this.http.get<PaymentTransaction[]>(this.APIUrl + '/transactions');
  }

  getTransactionByUserId(userId: string): Observable<PaymentTransaction[]> {
    return this.http.get<PaymentTransaction[]>(
      this.APIUrl + '/transactions/' + userId
    );
  }

  getTransactionsDataChart(
    fromDate: string,
    toDate: string
  ): Observable<DailyRevenue[]> {
    const params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);
    return this.http.get<DailyRevenue[]>(this.APIUrl + '/transactions-data', {
      params,
    });
  }
  getTransactionsCount(): Observable<number> {
    return this.http.get<number>(this.APIUrl + '/total-transactions');
  }
}
