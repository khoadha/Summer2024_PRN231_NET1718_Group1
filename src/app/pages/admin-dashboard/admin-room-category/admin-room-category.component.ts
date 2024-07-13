import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RoomCategory } from 'src/app/core/models/room';
import { RoomCategoryService } from 'src/app/core/services/room-category.service';
@Component({
  selector: 'app-admin-room-category',
  templateUrl: './admin-room-category.component.html',
  styleUrls: ['./admin-room-category.component.css'],
})
export class AdminRoomCategoryComponent implements OnInit {
  roomCategories!: RoomCategory[];
  showModal = false;
  newCategoryName = '';
  constructor(
    private categoryService: RoomCategoryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initCategory();
  }

  initCategory() {
    this.categoryService.getRoomCategories().subscribe((res) => {
      this.roomCategories = res;
    });
  }

  createCategory() {
    const categoryDto: any = {
      categoryName: this.newCategoryName,
    };
    this.categoryService.addRoomCategories(categoryDto).subscribe({
      next: (res) => {
        this.initCategory();
        this.showModal = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Created successfully!',
        });
      },
      error: (err) => {
        this.showErrorMessage(err);
      },
    });
  }

  showErrorMessage(err: any) {
    if (err && err.error && err.error.errors && err.error.errors.length > 0) {
      const errorMessage = err.error.errors.join(', ');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
      });
    }
  }
}
