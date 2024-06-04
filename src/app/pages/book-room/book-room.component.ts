import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { OrderService } from 'src/app/core/services/order.service';
import { CreateOrderDto, GuestDto } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import {Dialog} from 'primeng/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/core/services/room.service';
import { Room } from 'src/app/core/models/room';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {
  displayDialog: boolean = false;
  room!: Room;
  bookingForm!: FormGroup;
  newOccupant: GuestDto= { fullname: '', email: '', birthday: undefined };
  /*room = {
    name: 'Room Name',
    details: 'Room Details, Price $/Day',
    furnitures: [
      { name: 'Furniture 1', description: 'Description 1' },
      { name: 'Furniture 2', description: 'Description 2' }
    ]
  };
  */
  @ViewChild('feeText') feeText!: ElementRef;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private orderService: OrderService,private authService: AuthService,
    private router: Router, private roomService: RoomService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initRoom();
    this.initForm();
    
  }
  initRoom(){
    this.route.paramMap.subscribe(params => {
      const idFromRoute = params.get('id')!;
      const orderId = parseInt(idFromRoute, 10);
      this.roomService.getRoomById(orderId).subscribe(res => {
        this.room = res.data;
      })
    });
  }
  ngAfterViewInit(): void {
    this.updateTotalFee();
  }
  initForm() {
    this.bookingForm = this.fb.group({
      userId: [''],
      cost: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      wifi: [false],
      cleaning: [false],
      occupants: this.fb.array([], [this.validateOccupants])
    });
  }

  isOccupantValid(): boolean {
    return !!this.newOccupant.fullname && !!this.newOccupant.email && !!this.newOccupant.birthday;
  }


  validateOccupants(control: AbstractControl): ValidationErrors | null {
    const occupantsArray = control as FormArray;
    if (occupantsArray.length < 1) {
      return { noOccupants: true };
    }
    return null;
  }
  // Getter for occupants form array
  get occupants(): FormArray {
    return this.bookingForm.get('occupants') as FormArray;
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
  calculateTotalFee() {
    const baseFee = 50;
    let totalFee = baseFee;
  
    if (this.bookingForm.get('wifi')?.value) {
      totalFee += 50;
    }
  
    if (this.bookingForm.get('cleaning')?.value) {
      totalFee += 50;
    }
  
    const startDateString = this.bookingForm.get('startDate')?.value;
    const endDateString = this.bookingForm.get('endDate')?.value;
  
    if (startDateString && endDateString) {
      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);
      const totalDays = Math.ceil(Math.abs((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
      totalFee *= totalDays;
    }
    return totalFee;
  }  

  updateTotalFee() {
    const totalFee = this.calculateTotalFee();
    if(this.feeText){
      this.feeText.nativeElement.textContent = totalFee;
    }
  }

  submitForm() {
    if (this.bookingForm.valid) {
      const userId = this.authService.getUserIdFromToken();
      // Extracting guests from the form
      const guests = this.bookingForm.get('occupants')?.value.map((occupant: any) => ({
        fullname: occupant.fullname,
        email: occupant.email,
        birthday: occupant.birthday
      }));
  
      const orderDto: CreateOrderDto = {
        userId: userId,
        startDate: this.bookingForm.get('startDate')!.value,
        endDate: this.bookingForm.get('endDate')!.value,
        cost: this.calculateTotalFee(),
        guests: guests // Assigning the extracted guests array
      };
  
      console.log("Request payload:", orderDto);
  
      this.orderService.createOrder(orderDto).subscribe(
        response => {
          console.log('Order created successfully:', response);
          this.displayDialog = true; // Show the dialog
        },
        error => {
          console.error('Error creating order:', error);
        }
      );
    }
  }

  closeDialogAndReturn() {
    this.displayDialog = false; // Close the dialog
    this.router.navigate(['/']); // Navigate to the home page
  }
      
}
