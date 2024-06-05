import { Component, OnInit } from '@angular/core';
import { RoomServiceService } from 'src/app/core/services/room-service.service'; // Update service name
import { Service } from 'src/app/core/models/order'; // Update model path
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-service', // Update selector name
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.css']
})
export class AdminServiceComponent implements OnInit {
  serviceData!: Service[];
  showCreateModal = false;
  newService: Service = { name: '', description: '', servicePrice: [] };

  constructor(private serviceService: RoomServiceService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.initServices();
  }

  initServices() {
    this.serviceService.getService().subscribe(res => {
      this.serviceData = res;
    });
  }

  createService() {
    const serviceDto = {
      name: this.newService.name,
      description: this.newService.description,
    };

    this.serviceService.addService(serviceDto).subscribe();
    this.initServices();
    this.showCreateModal = false;
    this.messageService.add({severity:'success', summary:'Success', detail:'Created successfully!'});
  }
}
