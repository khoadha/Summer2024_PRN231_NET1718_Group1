import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { Room, RoomDisplay } from 'src/app/core/models/room';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css'],
})
export class RoomPageComponent implements OnInit {
  Rooms: RoomDisplay[] = [];
  currentPage = 1;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getRoomsDisplay().subscribe(res => {
      this.Rooms = res;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.getRooms();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRooms();
    }
  }
}
