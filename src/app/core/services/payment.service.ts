import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { PaymentTransaction } from '../models/transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'Payments';

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<PaymentTransaction[]> {
    return this.http.get<PaymentTransaction[]>(this.APIUrl + '/transactions')
  }

  getTransactionByUserId(userId: string): Observable<PaymentTransaction[]> {
    return this.http.get<PaymentTransaction[]>(this.APIUrl + '/transactions/'+ userId)
  }

}
