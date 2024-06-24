import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Service, ServicePrice, ServiceWithPrice } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "Services";
  readonly odataUrl = environment.oDataUrl + "services"

  constructor(private http: HttpClient) { }

  getService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.odataUrl}`);
  }

  getServiceWithNewestPrice(): Observable<ServiceWithPrice[]> {
    return this.http.get<ServiceWithPrice[]>(`${this.APIUrl}/newest-price`);
  }

  addService(formData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(`${this.APIUrl}/add-service/`, formData, httpOptions);
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