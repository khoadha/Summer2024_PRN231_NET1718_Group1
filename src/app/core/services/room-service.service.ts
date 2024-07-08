import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { PaginationService, Service, ServiceWithPrice } from '../models/order';
import { QueryModel } from '../models/queryModel';
import { PaginationRoomDisplay } from '../models/room';
import { ConvertQueryModelToRequestQuery } from '../utilities/ConvertQueryModel';

@Injectable({
  providedIn: 'root',
})
export class RoomServiceService {
  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'Services';
  readonly odataUrl = environment.oDataUrl + 'services';

  constructor(private http: HttpClient) {}

  getService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.odataUrl}`);
  }

  searchService(query: QueryModel): Observable<PaginationService> {
    var requestQuery = ConvertQueryModelToRequestQuery(query);
    return this.http.get<PaginationService>(`${this.odataUrl}${requestQuery}`);
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
    return this.http.post<any>(
      `${this.APIUrl}/add-service/`,
      formData,
      httpOptions
    );
  }

  addServicePrice(formData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(
      `${this.APIUrl}/prices/add-price/`,
      formData,
      httpOptions
    );
  }
}
