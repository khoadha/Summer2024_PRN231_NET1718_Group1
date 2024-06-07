import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Service, ServicePrice, ServiceWithPrice } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "Services";

  constructor(private http: HttpClient) { }

  getService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.APIUrl}/get-service/`);
  }

  getServiceWithNewestPrice(): Observable<ServiceWithPrice[]> {
    return this.http.get<ServiceWithPrice[]>(`${this.APIUrl}/get-service-newest-price/`);
  }
  addService(formData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(`${this.APIUrl}/add-service/`, formData, httpOptions);
  }
  getServicePrice(id: number): Observable<ServicePrice> {
    return this.http.get<ServicePrice>(`${this.APIUrl}/prices/get-price/`);
  }
  addServicePrice(formData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(`${this.APIUrl}/prices/add-price/`, formData, httpOptions);
  }
}