import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { Booking } from '../../models/booking.model';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { RoomCardComponent } from '../room-card/room-card.component';
import { RoomFilter } from '../filter-panel/filter-panel.component'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RoomCardComponent, BookingModalComponent], 
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {
  rooms$!: Observable<Room[]>;
  isLoading: boolean = true;

  isModalVisible: boolean = false;
  selectedRoom: Room | null = null;
  bookingSuccess: boolean = false;
  successMessage: string = '';

  currentFilter: RoomFilter = {
      type: null,
      minPrice: null,
      maxPrice: null
  };

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
      this.fetchRooms();
    }
  
  fetchRooms(): void {
    this.isLoading = true;

    this.rooms$ = this.roomService.getRooms(
        this.currentFilter.type,
        this.currentFilter.minPrice,
        this.currentFilter.maxPrice
    );
   
    
    this.rooms$.subscribe({
      next: () => this.isLoading = false,
      error: () => this.isLoading = false 
    });
  }

  onFilterChange(filterData: RoomFilter): void {
      this.currentFilter = filterData;
      this.fetchRooms(); 
  }

  openBookingModal(room: Room): void {
    if (room.isAvailable) {
      this.selectedRoom = room;
      this.isModalVisible = true;
    }
  }

  closeBookingModal(): void {
    this.isModalVisible = false;
    this.selectedRoom = null;
  }

  onBookingConfirmed(booking: Booking): void {
    this.roomService.bookRoom(booking).subscribe({
      next: () => {
        this.bookingSuccess = true;
        this.fetchRooms(); 
        
        setTimeout(() => this.bookingSuccess = false, 5000);
      },
      error: (err) => {
        console.error('Booking failed:', err);
        this.successMessage = `Booking failed: ${err.message || 'Server error'}`;
        this.bookingSuccess = true;
        setTimeout(() => this.bookingSuccess = false, 5000);
      }
    });
  }
  
}