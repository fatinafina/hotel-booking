// src/app/components/room-card/room-card.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-room-card',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input({ required: true }) room!: Room;
  @Output() book = new EventEmitter<Room>();

  onBookClick() {
    if (this.room.isAvailable) {
      this.book.emit(this.room);
    }
  }
}