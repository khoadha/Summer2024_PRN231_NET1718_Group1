import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service'; // Update import
import { Furniture, Room, RoomCategory, RoomFurniture } from 'src/app/core/models/room'; // Update import
import { MessageService } from 'primeng/api';
import { RoomCategoryService } from 'src/app/core/services/room-category.service';
import { FurnitureService } from 'src/app/core/services/furniture.service';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent implements OnInit {
  roomData: Room[] = [];
  showCreateModal = false;
  showAddFurnitureModal = false;
  newRoom: Room = { id:0,name:'', roomDescription:'', location: '', roomSize: 0, roomArea: 0, costPerDay: 0, categoryId: 0, isAvailable: false, roomFurniture:[], roomImages:[] };
  categories: RoomCategory[] = [];
  roomImages: File[] = [];
  allFurnitures: RoomFurniture[] = [];
  selectedRoom: Room | null = null;

  constructor(private roomService: RoomService,private categoryService: RoomCategoryService,
    private furnitureService: FurnitureService,private messageService: MessageService) { } // Updated service injection

  ngOnInit(): void {
    this.initRooms();
    this.loadCategories();
    this.loadAllFurnitures();
  }

  initRooms() {
    this.roomService.getRooms().subscribe(res => {
      this.roomData = res;
    });
  }
  loadAllFurnitures() {
    this.furnitureService.getFurnitures().subscribe(furnitures => {
      this.allFurnitures = furnitures.map(furniture => {
        const roomFurniture: RoomFurniture = {
          id: furniture.id || 0,
          quantity: 0, 
          furnitureId: furniture.id,
          furnitureName: furniture.name,
          furniture: furniture
        };
        return roomFurniture;
      });
    });
  }
  
  onFileChange(event: any) {
    this.roomImages = event.target.files;
  }

  loadCategories() {
    this.categoryService.getRoomCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  createRoom() {
    const formData = new FormData();
    formData.append('name', this.newRoom.name);
    formData.append('roomSize', this.newRoom.roomSize.toString());
    formData.append('roomDescription', this.newRoom.roomDescription);
    formData.append('roomArea', this.newRoom.roomArea.toString());
    formData.append('costPerDay', this.newRoom.costPerDay.toString());
    formData.append('location', this.newRoom.location);
    formData.append('categoryId', this.newRoom.categoryId.toString());
    formData.append('isAvailable', this.newRoom.isAvailable.toString());
    if (this.roomImages && this.roomImages.length > 0) {
      for (let i = 0; i < this.roomImages.length; i++) {
        formData.append('Files', this.roomImages[i]);
      }
    }

    this.roomService.addRoom(formData).subscribe({
      next: (res) =>{
        this.showCreateModal = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created successfully!' });
        this.initRooms();
        this.clearForm();
      },
      error: (err) =>{
        this.showErrorMessage(err);
      }
    });
  }

  clearForm() {
    this.newRoom = { id:0, name:'', roomDescription:'', location: '', roomSize: 0, roomArea: 0, costPerDay: 0, categoryId: 0, isAvailable: false, roomFurniture:[], roomImages:[] };
    this.roomImages = [];
  }
  
  openAddFurnitureModal(room: Room) {
    this.selectedRoom = room;
    this.showAddFurnitureModal = true;
    // Initialize quantity for each furniture in the room
    this.allFurnitures.forEach(furniture => {
      const existingFurniture = room.roomFurniture.find(rf => rf.furnitureId === furniture.furnitureId);
      if (existingFurniture) {
        furniture.quantity = existingFurniture.quantity;
      } else {
        furniture.quantity = 0;
      }
    });
  }

  addFurnitures() {
    const requestBody = {
      roomId: this.selectedRoom!.id,
      furnitures: [] as { furnitureId: number, quantity: number, furnitureName?: string }[]
    };
  
    // Populate the furnitures array in the request body
    this.allFurnitures.forEach(furniture => {
      if (furniture.quantity > 0) {
        requestBody.furnitures.push({
          furnitureId: furniture.id,
          quantity: furniture.quantity,
          furnitureName: furniture.furnitureName
        });
      }
    });
  
    // Call API to add furnitures to the room
    this.roomService.addFurnitureToRoom(requestBody).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Furniture added successfully.' });
      this.showAddFurnitureModal = false;
      this.selectedRoom = null;
      this.initRooms(); // Refresh room data
    });
  }

  showErrorMessage(err: any) {
    if (err && err.error && err.error.errors && err.error.errors.length > 0) {
      const errorMessage = err.error.errors.join(', ');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
    }
  }
}
