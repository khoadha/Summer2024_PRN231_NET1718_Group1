import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CreateOrderDto, GetFeeDto, GetOrderDto } from '../models/order';

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

  getOrderById(id: number): Observable<GetOrderDto> {
    return this.http.get<GetOrderDto>(`${this.APIUrl}/${id}`);
  }

  getFeeByOrderId(orderId: number, userId: string): Observable<GetFeeDto[]> {
    return this.http.get<GetFeeDto[]>(`${this.APIUrl}/get-fee/${orderId}?userId=${userId}`);
  }

  createOrder(orderDto: CreateOrderDto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(this.APIUrl + '/create-day', orderDto, httpOptions);
  }

  createPayment(createPaymentRequest: any ,userId: string){
    return this.http.post<any>(this.paymentUrl+`/create/${userId}`, createPaymentRequest);
  }
}
