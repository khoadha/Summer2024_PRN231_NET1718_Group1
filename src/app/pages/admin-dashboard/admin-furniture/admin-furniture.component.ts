import { Component, OnInit } from '@angular/core';
import { FurnitureService } from 'src/app/core/services/furniture.service';
import { Furniture } from 'src/app/core/models/room';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-furniture', // Update selector name
  templateUrl: './admin-furniture.component.html',
  styleUrls: ['./admin-furniture.component.css']
})
export class AdminFurnitureComponent implements OnInit {
  furnitureData: Furniture[] = [];
  showCreateModal = false;
  newFurniture: Furniture = { name: '', description:'',cost:0 };

  constructor(private furnitureService: FurnitureService, private messageService: MessageService) { } // Update service injection

  ngOnInit(): void {
    this.initFurniture();
  }

  initFurniture() {
    this.furnitureService.getFurnitures().subscribe(res => { // Update service call
      this.furnitureData = res;
    });
  }

  createFurniture() {
    const furnitureDto = {
      name: this.newFurniture.name,
      description: this.newFurniture.description,
      cost: this.newFurniture.cost.toString()
    };
    this.furnitureService.addFurnitures(furnitureDto).subscribe({
      next: (res) =>{
        this.showCreateModal = false;
        this.messageService.add({severity:'success', summary:'Success', detail:'Created successfully!'});
        this.initFurniture();
      },
      error: (err) =>{
        this.showErrorMessage(err);
      }
    });   
  }

  showErrorMessage(err: any) {
    if (err && err.error && err.error.errors && err.error.errors.length > 0) {
      const errorMessage = err.error.errors.join(', ');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
    }
  }
}
