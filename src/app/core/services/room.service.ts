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
  readonly odataUrl = environment.oDataUrl + "room";

  constructor(private http: HttpClient) {}

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.APIUrl}/${id}`);
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.odataUrl}`);
  }

  // searchRoom(searchQuery: string): Observable<RoomDisplay[]> {
  //   return this.http.get<{value: RoomDisplay[]}>(`${this.odataRoomDisplayUrl}?${searchQuery}`).pipe(
  //     map(response => response.value)
  //   );
  // }

  getRoomsDisplay(): Observable<RoomDisplay[]> {
    return this.http.get<RoomDisplay[]>(`${this.odataUrl}-display`);
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
