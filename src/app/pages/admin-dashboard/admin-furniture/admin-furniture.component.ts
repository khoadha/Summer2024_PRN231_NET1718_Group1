import { Component, OnInit } from '@angular/core';
import { FurnitureService } from 'src/app/core/services/furniture.service';
import { Furniture } from 'src/app/core/models/room';

@Component({
  selector: 'app-admin-furniture', // Update selector name
  templateUrl: './admin-furniture.component.html',
  styleUrls: ['./admin-furniture.component.css']
})
export class AdminFurnitureComponent implements OnInit {
  furnitureData!: Furniture[];
  showCreateModal = false;
  newFurniture: Furniture = { name: '', description:'',cost:0 }; // Initialize newFurniture object

  constructor(private furnitureService: FurnitureService) { } // Update service injection

  ngOnInit(): void {
    this.initFurniture();
  }

  initFurniture() {
    this.furnitureService.getFurnitures().subscribe(res => { // Update service call
      this.furnitureData = res;
    });
  }

  createFurniture() {
    const formData = new FormData();
        formData.append('name', this.newFurniture.name);
        formData.append('description', this.newFurniture.description);
        formData.append('cost', this.newFurniture.cost.toString());
    this.furnitureService.addFurnitures(formData).subscribe();
  }
}
