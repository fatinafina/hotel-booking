import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Room } from '../models/room.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  private readonly STORAGE_KEY = 'hotelRoomsState';

  private initialMockRooms: Room[] = [
    { id: 1, name: '101', type: 'Suite', price: 299, isAvailable: true, imageUrl: 'assets/room-suite-1.jpg' },
    { id: 2, name: '103', type: 'Suite', price: 299, isAvailable: true, imageUrl: 'assets/room-suite-2.jpg' },
    { id: 3, name: '203', type: 'Single', price: 149, isAvailable: true, imageUrl: 'assets/room-single-1.jpg' },
    { id: 4, name: '207', type: 'Double', price: 199, isAvailable: false, imageUrl: 'assets/room-double-1.jpg' },
    { id: 5, name: '305', type: 'Suite', price: 349, isAvailable: true, imageUrl: 'assets/room-suite-3.jpg' },
    { id: 6, name: '308', type: 'Single', price: 139, isAvailable: true, imageUrl: 'assets/room-single-2.jpg' },
  ];

  private mockRooms: Room[] = [];

  constructor() {
    this.loadRoomsFromStorage();
  }
  
  private loadRoomsFromStorage(): void {
    const savedState = localStorage.getItem(this.STORAGE_KEY);
    if (savedState) {
      this.mockRooms = JSON.parse(savedState) as Room[];
    } else {
      this.mockRooms = [...this.initialMockRooms];
      this.saveRoomsToStorage(); 
    }
  }

  private saveRoomsToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.mockRooms));
  }

  getRooms(
    filterType: 'Single' | 'Double' | 'Suite' | null = null,
    minPrice: number | null = null,
    maxPrice: number | null = null
  ): Observable<Room[]> {
    let filteredRooms = [...this.mockRooms];

    if (filterType) {
      filteredRooms = filteredRooms.filter(room => room.type === filterType);
    }
    
    if (minPrice !== null) {
      filteredRooms = filteredRooms.filter(room => room.price >= minPrice);
    }
    if (maxPrice !== null) {
      filteredRooms = filteredRooms.filter(room => room.price <= maxPrice);
    }
    
    return of(filteredRooms).pipe(delay(300)); 
  }

  bookRoom(bookingDetails: Booking): Observable<void> {
    const room = this.mockRooms.find(r => r.id === bookingDetails.roomId);

    if (room && room.isAvailable) {
      room.isAvailable = false; 
      
      return of(undefined).pipe(
        delay(500),
        tap(() => {
          this.saveRoomsToStorage(); 
          console.log(`Room ${room.name} booked by ${bookingDetails.guestName}. State saved.`);
        })
      ); 
    }
    
    return new Observable<void>(observer => {
      observer.error(new Error('Room not available or not found.'));
    });
  }

  resetAllRoomsToAvailable(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    
    this.mockRooms = [...this.initialMockRooms]; 
    
    console.log("All room states have been reset to initial availability.");
  }
}