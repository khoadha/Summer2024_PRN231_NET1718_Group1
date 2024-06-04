import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Room, RoomCategory } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomCategoryService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "RoomCategories";

  constructor(private http: HttpClient) { }

  getRoomCategories(): Observable<RoomCategory[]> {
    return this.http.get<RoomCategory[]>(`${this.APIUrl}/get-category/`);
  }

  addRoomCategories(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(`${this.APIUrl}/add-category/`, formData, httpOptions);
  }
}