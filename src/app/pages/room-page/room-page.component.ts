import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { Room, RoomCategory, RoomDisplay } from 'src/app/core/models/room';
import { RoomCategoryService } from 'src/app/core/services/room-category.service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css'],
})
export class RoomPageComponent implements OnInit {
  rooms: RoomDisplay[] = [];
  currentPage = 1;

  search: string = '';
  selectedCategory: string = '';
  orderBy: string = 'name';
  categories: RoomCategory[] = [];

  constructor(private roomService: RoomService, private categoryService: RoomCategoryService) {}

  ngOnInit(): void {
    this.roomService.getRoomsDisplay().subscribe(res => {
      this.rooms = res;
    });
    this.categoryService.getRoomCategories().subscribe(res => {
      this.categories = res;
    });
  }

  onSubmit() {
    const searchQuery = this.constructSearchQuery();
    this.roomService.searchRoom(searchQuery).subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  constructSearchQuery(): string {
    let query = '';

    if (this.search) {
      query += `$filter=contains(name,'${this.search}')&`;
    }

    if (this.selectedCategory) {
      query += `$filter=categoryName eq '${this.selectedCategory}'&`;
    }

    if (this.orderBy) {
      query += `$orderby=${this.orderBy === 'price' ? 'costPerDay' : 'name'}&`;
    }

    return query.slice(0, -1);
  }
}
