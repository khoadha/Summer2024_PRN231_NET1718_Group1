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
  newService: ServiceWithPrice = { name: '', description: '', servicePriceNumber: 0, isCountPerCapita: false, serviceType: 0 };
  newPrice: number = 0;
  selectedService: ServiceWithPrice | null = null;
  image: File | undefined;
  isLoading: boolean = false;
  serviceOptions = [
    { name: 'All', code: '0' },
    { name: 'Only daily rental', code: '1' },
    { name: 'Only monthly rental', code: '2' },
  ]

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
    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', this.newService.name);
    formData.append('description', this.newService.description);
    formData.append('image', this.image!);
    formData.append('serviceType', this.newService.serviceType.toString());
    formData.append('isCountPerCapita', this.newService.isCountPerCapita.toString());

    this.serviceService.addService(formData).subscribe({
      next: (res) => {
        this.initServices();
        this.showCreateModal = false;
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created successfully!' });
      },
      error: (err) => {
        this.showErrorMessage(err);
      }
    });
  }



  onSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Add image successfully!' });
    this.image = event.currentFiles[0];
  }

  showErrorMessage(err: any) {
    if (err && err.error && err.error.errors && err.error.errors.length > 0) {
      const errorMessage = err.error.errors.join(', ');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
    }
  }
  openPriceModal(service: ServiceWithPrice) {
    this.selectedService = service;
    this.showPriceModal = true;
  }



  createServicePrice() {
    const requestBody = {
      serviceId: this.selectedService!.id,
      amount: this.newPrice
    };

    this.serviceService.addServicePrice(requestBody).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service Price added successfully.' });
        this.showPriceModal = false;
        this.selectedService = null;
        this.initServices();
      },
      error: (err) => {
        this.showErrorMessage(err);
      }
    });
  }
}