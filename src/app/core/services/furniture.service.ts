import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Furniture, Room, RoomCategory } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "RoomCategories";

  constructor(private http: HttpClient) { }

  getFurnitures(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`${this.APIUrl}/get-furniture/`);
  }

  addFurnitures(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(`${this.APIUrl}/add-furniture/`, formData, httpOptions);
  }
}