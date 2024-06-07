import { Component, OnInit } from '@angular/core';
import { RoomServiceService } from 'src/app/core/services/room-service.service'; // Update service name
import { ServicePrice, ServiceWithPrice } from 'src/app/core/models/order'; // Update model path
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-service', // Update selector name
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.css']
})
export class AdminServiceComponent implements OnInit {
  serviceData!: ServiceWithPrice[];
  showCreateModal = false;
  showPriceModal = false;
  newService: ServiceWithPrice = { name: '', description: '', servicePriceNumber:0 };
  newPrice: ServicePrice = {};
  selectedService: ServiceWithPrice | null = null;
  constructor(private serviceService: RoomServiceService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.initServices();
  }

  initServices() {
    this.serviceService.getServiceWithNewestPrice().subscribe(res => {
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
  openPriceModal(service: ServiceWithPrice) {
    this.selectedService = service;
    this.showPriceModal = true;
  }
  createServicePrice() {
    const requestBody = {
      serviceId: this.selectedService!.id,
      amount: this.newPrice.amount,
      startDate: this.newPrice.startDate,
      endDate: this.newPrice.endDate
    };

    this.serviceService.addServicePrice(requestBody).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Price added successfully.' });
      this.showPriceModal = false;
      this.selectedService = null;
      this.initServices();
    });
  }
}
