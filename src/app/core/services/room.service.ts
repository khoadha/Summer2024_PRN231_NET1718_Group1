import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CreateOrderDto } from '../models/order';
import { PaginationRoomDisplay, Room, RoomDisplay } from '../models/room';
import { QueryModel } from '../models/queryModel';
import { ConvertQueryModelToRequestQuery } from '../utilities/ConvertQueryModel';
import { GetRoomAdminDisplayDTO } from '../models/statistic';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'Rooms';
  readonly odataUrl = environment.oDataUrl + 'room';

  constructor(private http: HttpClient) {}

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.APIUrl}/${id}`);
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.odataUrl}`);
  }

  searchRoomDisplay(query: QueryModel): Observable<PaginationRoomDisplay> {
    var requestQuery = ConvertQueryModelToRequestQuery(query);
    return this.http.get<PaginationRoomDisplay>(
      `${this.odataUrl}-display${requestQuery}`
    );
  }

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

  getAdminRoomsInfo(): Observable<GetRoomAdminDisplayDTO> {
    return this.http.get<GetRoomAdminDisplayDTO>(
      `${this.APIUrl}/get-room-count/`
    );
  }
}
