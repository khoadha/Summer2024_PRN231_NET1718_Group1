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
  selector: 'app-book-room-monthly',
  templateUrl: './book-room-monthly.component.html',
  styleUrls: ['./book-room-monthly.component.css']
})
export class BookRoomMonthlyComponent implements OnInit {
  loading: boolean = true;
  loadingSubmit: boolean = false;
  displayDialog: boolean = false;
  showContract: boolean = false;
  room!: Room;
  bookingForm!: FormGroup;
  newOccupant: GuestDto = { fullname: '', email: '', birthday: undefined };
  allServices: ServiceWithPrice[] = [];
  today!: string;
  todayObj!: Date;
  username!: string;
  totalDays: number = 0;
  estimatedEndDate!: string
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private orderService: OrderService, private authService: AuthService,
    private router: Router, private roomService: RoomService,
    private route: ActivatedRoute, private serviceService: RoomServiceService, private messageService: MessageService) {

  }

  ngOnInit() {
    const todayDate = new Date();
    this.todayObj = new Date();
    this.today = todayDate.toISOString().split('T')[0];
    this.username = this.authService.getUsernameFromToken();
    this.loading = true;
    this.initServicesAndForm();
    this.initRoom();
    this.loading = false;
  }

  initRoom() {
    const idFromRoute = this.route.snapshot.paramMap.get('id')!;
    const orderId = parseInt(idFromRoute, 10);
    this.roomService.getRoomById(orderId).subscribe(res => {
      this.room = res;
    });
  }

  initServicesAndForm() {
    this.serviceService.getServiceWithNewestPrice().subscribe(res => {
      this.allServices = res;
      this.initForm();
    });
  }

  initForm() {
    const serviceControls: { [key: string]: any } = {};
    this.allServices.forEach(service => {
      serviceControls[service.name] = [false];
    });

    this.bookingForm = this.fb.group({
      userId: [''],
      cost: [''],
      startDate: [this.today, [Validators.required, this.dateValidator()]],
      monthLast: [1, [Validators.required]],
      estimatedEndDate: [{ value: this.estimatedEndDate, disabled: true }],
      occupants: this.fb.array([], [this.validateOccupants]),
      ...serviceControls
    })
  }

  isPhoneNumberValid(): boolean {
    const phoneRegex = /^\d{9,10}$/;
    return !this.newOccupant.email || phoneRegex.test(this.newOccupant.email);
  }

  isBirthdayValid(): boolean {
    const today = new Date();
    var isValid = false;
    if (this.newOccupant.birthday) {
      const selectedDate = new Date(this.newOccupant.birthday);
      isValid = selectedDate <= today;
    }
    return isValid;
  }

  isOccupantValid(): boolean {
    var isPhoneNumberValid = this.isPhoneNumberValid();
    var isBirthdayValid = this.isBirthdayValid();

    return !!this.newOccupant.fullname && isPhoneNumberValid && isBirthdayValid && !!this.newOccupant.birthday && this.occupants.length < this.room.roomSize;
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
      const inputDate = control.value;

      return inputDate >= this.today ? null : { 'dateInvalid': true };
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

  calculateEndDate(startDate: Date, months: number): Date {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + months);
    return endDate;
  }

  calculateDays(): void {
    const startDateString = this.bookingForm.get('startDate')?.value;
    const months = this.bookingForm.get('monthLast')?.value;
    if (startDateString && months) {
      const startDate = new Date(startDateString);
      const endDate = this.calculateEndDate(startDate, parseInt(months, 10));
      this.estimatedEndDate = endDate.toISOString().split('T')[0];
      this.bookingForm.get('estimatedEndDate')?.setValue(this.estimatedEndDate, { emitEvent: false });
      const totalDays = 1 + Math.ceil(Math.abs((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
      this.totalDays = totalDays;
    } else {
      this.totalDays = 0;
    }
  }

  calculateTotalFee() {
    let feePerDay = this.room.costPerDay;
    const occupantsCount = this.occupants.length;

    this.allServices.forEach(service => {
      const serviceControl = this.bookingForm.get(service.name);
      if (serviceControl && serviceControl.value) {
        if (service.isCountPerCapita) {
          feePerDay += service.servicePriceNumber * occupantsCount;
        } else {
          feePerDay += service.servicePriceNumber;
        }
      }
    });
    const totalFee = feePerDay * this.totalDays;
    return totalFee;
  }

  submitForm() {
    if (this.bookingForm.valid) {
      this.loadingSubmit = true;
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
        endDate: this.bookingForm.get('estimatedEndDate')!.value,
        cost: this.calculateTotalFee(),
        guests: guests,
        roomServices: roomServices,
        isMonthly: true
      };

      this.orderService.createOrder(orderDto).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created order successfully.' });
          this.displayDialog = true;
          this.showContract = false;
          this.loadingSubmit = false;
        },
        error: (err) => {
          this.loadingSubmit = false;
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
