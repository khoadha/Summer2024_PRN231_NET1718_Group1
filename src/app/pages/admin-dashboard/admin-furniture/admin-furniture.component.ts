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
  furnitureData!: Furniture[];
  showCreateModal = false;
  newFurniture: Furniture = { name: '', description:'',cost:0 }; // Initialize newFurniture object

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
      cost: this.newFurniture.cost.toString() // Convert cost to string if necessary
    };
    this.furnitureService.addFurnitures(furnitureDto).subscribe();
    this.showCreateModal = false;
    this.messageService.add({severity:'success', summary:'Success', detail:'Created successfully!'});
    this.initFurniture();
  }
}
