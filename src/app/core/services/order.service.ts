import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CreateOrderDto, GetFeeDto, GetOrderDisplayDto, GetOrderDto } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'order';
  readonly paymentUrl = this.baseUrl + 'Payments';
  readonly odataUrl = environment.oDataUrl + "orders"

  constructor(private http: HttpClient) {}

  getOrders(): Observable<GetOrderDto[]> {
    return this.http.get<GetOrderDto[]>(`${this.odataUrl}`);
  }

  getOrdersByUserId(userId: string): Observable<GetOrderDisplayDto[]> {
    return this.http.get<GetOrderDisplayDto[]>(`${this.APIUrl}/get-user-id/${userId}`);
  }

  getOrderById(id: number): Observable<GetOrderDto> {
    return this.http.get<GetOrderDto>(`${this.APIUrl}/${id}`);
  }

  getFeeByOrderId(orderId: number, userId: string): Observable<GetFeeDto[]> {
    return this.http.get<GetFeeDto[]>(`${this.APIUrl}/get-fee/${orderId}?userId=${userId}`);
  }

  getDeferredElectricityFee(): Observable<GetFeeDto[]> {
    return this.http.get<GetFeeDto[]>(`${this.APIUrl}/deferred-electricity-fee`);
  }

  updateAmountFees(dto: any): Observable<GetFeeDto[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<GetFeeDto[]>(`${this.APIUrl}/update-amount-fee`,dto, httpOptions)
  }

  createOrder(orderDto: CreateOrderDto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(this.APIUrl, orderDto, httpOptions);
  }

  createPayment(createPaymentRequest: any ,userId: string){
    return this.http.post<any>(this.paymentUrl+`/create/${userId}`, createPaymentRequest);
  }

  handlePaymentSuccess(txnRef: string, userId: string) {
    return this.http.put(`${this.paymentUrl}/payment-success/${txnRef}/${userId}`, {});
  }
}
