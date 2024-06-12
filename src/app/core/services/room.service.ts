import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CreateOrderDto } from '../models/order';
import { Room, RoomDisplay } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'Rooms';
  readonly odataUrl = environment.odataUrl + "ORooms"
  readonly odataRoomDisplayUrl = environment.odataUrl + "ORoomDisplays"
  readonly odataRoomDetailUrl = environment.odataUrl + "ORoomDetails"

  constructor(private http: HttpClient) {}

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.odataUrl}({${id}})`);
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<{value: Room[]}>(`${this.odataUrl}`).pipe(
      map(response => response.value)
    );
  }

  getRoomsDisplay(): Observable<RoomDisplay[]> {
    return this.http.get<{value: RoomDisplay[]}>(`${this.odataRoomDisplayUrl}`).pipe(
      map(response => response.value)
    );
  }

  getRoomsOData(page: number): Observable<Room[]> {
    const skip = (page - 1) * 3;
    const top = 3;
    return this.http.get<Room[]>(
      `${this.APIUrl}/get-room/?$skip=${skip}&$top=${top}`
    );
  }
  searchRoomByQuery(query: string): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/search-room/${query}`);
  }

  addRoom(formData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(
      `${this.APIUrl}/add-room/`,
      formData,
      httpOptions
    );
  }

  addFurnitureToRoom(formData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(
      `${this.APIUrl}/add-furniture-to-room/`,
      formData,
      httpOptions
    );
  }

  updateRoom(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.put<any>(`${this.APIUrl}/update-room/`, data, httpOptions);
  }
}
