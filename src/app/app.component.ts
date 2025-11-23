// src/app/app.component.ts

import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; 
import { RoomListComponent } from './components/room-list/room-list.component'; 
import { FilterPanelComponent, RoomFilter } from './components/filter-panel/filter-panel.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RoomListComponent, FilterPanelComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel-booking-engine';
  isFilterDropdownOpen: boolean = false; 
  
  @ViewChild(RoomListComponent) roomList!: RoomListComponent; 

  toggleFilterDropdown(): void {
    this.isFilterDropdownOpen = !this.isFilterDropdownOpen;
  }
  
  onFilterApplied(filterData: RoomFilter): void {
    if (this.roomList) {
      this.roomList.onFilterChange(filterData); 
      this.isFilterDropdownOpen = false; 
    }
  }
}