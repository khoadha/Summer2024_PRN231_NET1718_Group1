
import { Component, OnInit, ViewChild,ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {

  bookingForm!: FormGroup;
  room = {
    name: 'Room Name',
    details: 'Room Details, Price $/Day',
    furnitures: [
      { name: 'Furniture 1', description: 'Description 1' },
      { name: 'Furniture 2', description: 'Description 2' }
    ]
  };
  @ViewChild('feeText') feeText!: ElementRef;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initForm();
    
  }

  ngAfterViewInit(): void {
    this.updateTotalFee();
  }
  initForm() {
    this.bookingForm = this.fb.group({
      roomDetails: [this.room.details, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      wifi: [false],
      cleaning: [false],
      occupants: this.fb.array([
        this.fb.group({
          fullname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          birthday: ['']
        })
      ])
    });
  }

  get occupants() {
    return this.bookingForm.get('occupants') as FormArray;
  }

  addOccupant() {
    const newOccupant = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['']
    });
  
    this.occupants.push(newOccupant);
    this.cdr.detectChanges();
  }

  removeOccupant(index: number) {
    this.occupants.removeAt(index);
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
  
    const startDate = this.bookingForm.get('startDate')?.value;
    const endDate = this.bookingForm.get('endDate')?.value;
  
    if (startDate && endDate) {
      const totalDays = Math.ceil(Math.abs((endDate - startDate) / (1000 * 60 * 60 * 24)));
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
    // Handle form submission here
  }
}
