import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CreateOrderDto } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "room";

  constructor(private http: HttpClient) { }

  getRoomById(id: number): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/${id}`);
  }
}
