import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { OrderService } from 'src/app/core/services/order.service';
import { CreateOrderDto, GuestDto, RoomServiceDto, Service, ServiceWithPrice } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/core/services/room.service';
import { Room } from 'src/app/core/models/room';
import { RoomServiceService } from 'src/app/core/services/room-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {
  loading: boolean = true;
  displayDialog: boolean = false;
  showContract: boolean = false;
  room!: Room;
  bookingForm!: FormGroup;
  newOccupant: GuestDto = { fullname: '', email: '', birthday: undefined };
  allServices: ServiceWithPrice[] = [];
  today: string;
  username: string;
  @ViewChild('feeText') feeText!: ElementRef;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private orderService: OrderService, private authService: AuthService,
    private router: Router, private roomService: RoomService,
    private route: ActivatedRoute, private serviceService: RoomServiceService, private messageService: MessageService) {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0]; // format the date to 'YYYY-MM-DD' 
    this.username = this.authService.getUsernameFromToken();
  }

  async ngOnInit() {
    try {
      await this.initServicesAndForm();
      await this.initRoom();
      this.loading = false;
      this.updateTotalFee();
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }
  async initRoom() {
    const idFromRoute = this.route.snapshot.paramMap.get('id')!;
    const orderId = parseInt(idFromRoute, 10);
    const res = await this.roomService.getRoomById(orderId).toPromise();
    if (res) {
      this.room = res;
    }
  }
  
  
  async initServicesAndForm() {
    const res = await this.serviceService.getServiceWithNewestPrice().toPromise();
      if (res) {
      this.initForm();
    }
  }
  initForm() {
    const serviceControls: { [key: string]: any } = {};
    this.allServices.forEach(service => {
      serviceControls[service.name] = [false];
    });

    this.bookingForm = this.fb.group({
      userId: [''],
      cost: [''],
      startDate: ['', [Validators.required, this.dateValidator()]],
      endDate: ['', [Validators.required, this.dateValidator()]],
      wifi: [false],
      cleaning: [false],
      occupants: this.fb.array([], [this.validateOccupants]),
      ...serviceControls
    }, { validators: this.dateRangeValidator() });
  }

  isOccupantValid(): boolean {
    return !!this.newOccupant.fullname && !!this.newOccupant.email && !!this.newOccupant.birthday && this.occupants.length < this.room.roomSize;
  }


  validateOccupants(control: AbstractControl): ValidationErrors | null {
    const occupantsArray = control as FormArray;
    if (occupantsArray.length < 1) {
      return { noOccupants: true };
    }
    return null;
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date();
      const inputDate = new Date(control.value);
      return inputDate >= today ? null : { 'dateInvalid': true };
    };
  }

  dateRangeValidator(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const startDate = formGroup.get('startDate')?.value;
      const endDate = formGroup.get('endDate')?.value;
      return new Date(startDate) < new Date(endDate) ? null : { 'dateRangeInvalid': true };
    };
  }

  get occupants(): FormArray {
    return this.bookingForm.get('occupants') as FormArray;
  }

  get selectedServices() {
    return this.allServices.filter(service => this.bookingForm.get(service.name)?.value);
  }

  addOccupant() {
    const tempOccupant = this.fb.group({
      fullname: [this.newOccupant.fullname],
      email: [this.newOccupant.email],
      birthday: [this.newOccupant.birthday]
    });
    this.occupants.push(tempOccupant);
    this.resetNewOccupant();
    this.cdr.detectChanges();
  }

  removeOccupant(index: number) {
    this.occupants.removeAt(index);
  }

  resetNewOccupant() {
    this.newOccupant.fullname = '';
    this.newOccupant.email = '';
    this.newOccupant.birthday = undefined;
  }
  calculateDays(){
    const startDateString = this.bookingForm.get('startDate')?.value;
    const endDateString = this.bookingForm.get('endDate')?.value;

    if (startDateString && endDateString) {
      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);
      const totalDays = Math.ceil(Math.abs((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
      return totalDays;
    }
    return 0;
  }
  calculateTotalFee() {
    const baseFee = this.room.costPerDay;
    let totalFee = baseFee;
    this.allServices.forEach(service => {
      const serviceControl = this.bookingForm.get(service.name);
      if (serviceControl && serviceControl.value) {
        totalFee += service.servicePriceNumber;
      }
    });
    const totalDays = this.calculateDays();
    totalFee *= totalDays;
    return totalFee;
  }

  updateTotalFee() {
    const totalFee = this.calculateTotalFee();
    if (this.feeText) {
      this.feeText.nativeElement.textContent = totalFee;
    }
  }
  submitForm() {
    if (this.bookingForm.valid) {

      const userId = this.authService.getUserIdFromToken();
      const guests = this.bookingForm.get('occupants')?.value.map((occupant: any) => ({
        fullname: occupant.fullname,
        email: occupant.email,
        birthday: occupant.birthday
      }));
      const roomServices: RoomServiceDto[] = this.selectedServices.map(service => ({
        serviceId: service.id
      }));
      
      // Create the orderDto
      const orderDto: CreateOrderDto = {
        userId: userId,
        roomId: this.room.id,
        startDate: this.bookingForm.get('startDate')!.value,
        endDate: this.bookingForm.get('endDate')!.value,
        cost: this.calculateTotalFee(),
        guests: guests,
        roomServices: roomServices
      };

      this.orderService.createOrder(orderDto).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created order successfully.' });
          this.displayDialog = true;
        },
        error: (err) => {
          this.showErrorMessage(err);
        }
      }
      );
    }
  }

  showErrorMessage(err: any) {
    if (err && err.error && err.error.errors && err.error.errors.length > 0) {
      const errorMessage = err.error.errors.join(', ');
      this.messageService.add({ severity: 'error', summary: 'Order Error', detail: errorMessage });
    }
  }
  closeDialogAndReturn() {
    this.displayDialog = false;
    this.router.navigate(['/']);
  }
  openContractModal() {
    this.showContract = true;
  }

}
