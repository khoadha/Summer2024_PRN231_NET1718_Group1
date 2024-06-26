import { Component, OnInit } from '@angular/core';
import { QueryModel } from 'src/app/core/models/queryModel';
import { Room, RoomDisplay } from 'src/app/core/models/room';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit{
  properties: RoomDisplay[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.initRooms();
  }

  initRooms() {
    var query: QueryModel = {
      top: 8,
    };
    this.roomService.searchRoomDisplay(query).subscribe(res => {
      this.properties = res.data;
    });
  }
}