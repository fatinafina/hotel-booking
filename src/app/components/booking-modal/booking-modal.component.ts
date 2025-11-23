// src/app/components/booking-modal/booking-modal.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <-- Required for Forms
import { Room } from '../../models/room.model';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.component.css'
})
export class BookingModalComponent implements OnInit {
  @Input() room: Room | null = null;
  @Input() isVisible: boolean = false; 
  @Output() bookingConfirmed = new EventEmitter<Booking>();
  @Output() close = new EventEmitter<void>();

  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      guestName: ['', Validators.required],
      checkInDate: ['', [Validators.required, this.dateValidator]],
      checkOutDate: ['', [Validators.required, this.dateValidator]]
    });
  }
  
  dateValidator(control: any): { [key: string]: any } | null {
    const today = new Date().toISOString().slice(0, 10);
    return control.value && control.value < today ? { 'pastDate': true } : null;
  }

  onSubmit(): void {
    if (this.bookingForm.valid && this.room) {
      const formValue = this.bookingForm.value;
      this.bookingConfirmed.emit({
        roomId: this.room.id,
        guestName: formValue.guestName,
        checkInDate: formValue.checkInDate,
        checkOutDate: formValue.checkOutDate,
      } as Booking); 
      this.closeModal();
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }

  closeModal(): void {
    this.bookingForm.reset();
    this.close.emit();
  }
}