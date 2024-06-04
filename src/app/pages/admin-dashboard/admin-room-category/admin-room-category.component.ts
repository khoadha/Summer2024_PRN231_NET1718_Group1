import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomCategory } from 'src/app/core/models/room';
import { RoomCategoryService } from 'src/app/core/services/room-category.service';
@Component({
  selector: 'app-admin-room-category',
  templateUrl: './admin-room-category.component.html',
  styleUrls: ['./admin-room-category.component.css']
})
export class AdminRoomCategoryComponent implements OnInit {
  roomCategories!: RoomCategory[];
  showModal = false;
  newCategoryName = '';
  constructor(private categoryService: RoomCategoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initCategory();
  }
  
  initCategory(){
    this.route.paramMap.subscribe(params => {
      this.categoryService.getRoomCategories().subscribe(res => {
        this.roomCategories = res;
      })
    });
  }
  createCategory() {
    const categoryDto: any = {
      categoryName: this.newCategoryName
    };
    this.categoryService.addRoomCategories(categoryDto).subscribe();
  }
}
