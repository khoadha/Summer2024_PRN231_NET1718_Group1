import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CreateOrderDto, GetOrderDto } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'order';
  readonly odataUrl = environment.odataUrl + "OOrders"

  constructor(private http: HttpClient) {}

  getOrders(): Observable<GetOrderDto[]> {
    return this.http.get<{ value: GetOrderDto[]}>(`${this.odataUrl}`).pipe(
      map(response => response.value)
    );
  }

  getOrderById(id: number): Observable<GetOrderDto> {
    return this.http.get<GetOrderDto>(`${this.odataUrl}(${id})`);
  }

  /*getOrderById(id: number): Observable<GetOrderDto> {
    return this.http.get<{ value: GetOrderDto[] }>(`${this.odataUrl}?$filter=id eq ${id}`)
      .pipe(
        map(response => {
          if (response.value && response.value.length > 0) {
            return response.value[0];
          } else {
            throw new Error('Order not found');
          }
        })
      );
  }*/
  createOrder(orderDto: CreateOrderDto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(this.APIUrl + '/create', orderDto, httpOptions);
  }
}
