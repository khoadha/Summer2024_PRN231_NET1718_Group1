import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Furniture } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "Furnitures";
  readonly odataUrl = environment.oDataUrl + "product"

  constructor(private http: HttpClient) { }

  getFurnitures(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`${this.odataUrl}`);
  }

  addFurnitures(formData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(`${this.APIUrl}/add-furniture/`, formData, httpOptions);
  }
}