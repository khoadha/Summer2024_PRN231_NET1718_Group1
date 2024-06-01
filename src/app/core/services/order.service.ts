import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CreateOrderDto } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "order";

  constructor(private http: HttpClient) { }

  createOrder(orderDto: CreateOrderDto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.APIUrl + '/create', orderDto, httpOptions);
  }
}
