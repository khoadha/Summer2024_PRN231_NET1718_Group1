
import { Component, OnInit, ViewChild,ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OrderService } from 'src/app/core/services/order.service';
import { CreateOrderDto, GuestDto } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {

  bookingForm!: FormGroup;
  newOccupant: GuestDto= { fullname: '', email: '', birthday: undefined };
  room = {
    name: 'Room Name',
    details: 'Room Details, Price $/Day',
    furnitures: [
      { name: 'Furniture 1', description: 'Description 1' },
      { name: 'Furniture 2', description: 'Description 2' }
    ]
  };
  @ViewChild('feeText') feeText!: ElementRef;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private orderService: OrderService,private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    
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
      occupants: this.fb.array([], Validators.required)
    });
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
        },
        error => {
          console.error('Error creating order:', error);
        }
      );
    }
  }
      
}
