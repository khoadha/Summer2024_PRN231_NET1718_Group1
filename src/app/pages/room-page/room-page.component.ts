import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { Room, RoomCategory, RoomDisplay } from 'src/app/core/models/room';
import { RoomCategoryService } from 'src/app/core/services/room-category.service';
import { QueryModel } from 'src/app/core/models/queryModel';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css'],
})
export class RoomPageComponent implements OnInit {

  @ViewChild('paginator', { static: true }) paginator!: Paginator;
  rooms: RoomDisplay[] = [];
  currentPage = 1;

  search: string = '';
  selectedCategory: string = '';
  orderBy: string = 'name';
  categories: RoomCategory[] = [];

  size: number = 6;
  offset: number = 0;
  totalRooms: number = 0;

  orderByOptions = [
    { label: 'By Name', value: 'name' },
    { label: 'By Area (Small to large)', value: 'roomArea asc' },
    { label: 'By Area (Large to small)', value: 'roomArea desc' },
    { label: 'By Price (Cheap to Expensive)', value: 'costPerDay asc' },
    { label: 'By Price (Expensive to cheap)', value: 'costPerDay desc' },
  ];

  constructor(private roomService: RoomService, private categoryService: RoomCategoryService) { }

  ngOnInit(): void {
    this.handleSearch();
    this.categoryService.getRoomCategories().subscribe(res => {
      this.categories = res;
    });
  }

  handleSearch() {
    var query: QueryModel = {
      filter: this.search,
      orderBy: this.orderBy,
      top: this.size,
      skip: this.size * this.offset,
      selectedDropdownValue: this.selectedCategory
    };
    this.roomService.searchRoomDisplay(query).subscribe(res => {
      this.rooms = res.data;
      this.totalRooms = res.total;
    });
  }

  onApplyFilter() {
    this.offset = 0;
    this.handleSearch();
  }

  onPageChange(e: PageEvent) {
    this.offset = e.page;
    this.handleSearch();
  }

  onSubmit() {
    this.handleSearch();
  }
}

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}
