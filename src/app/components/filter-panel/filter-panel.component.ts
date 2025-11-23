import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 

export interface RoomFilter {
    type: 'Single' | 'Double' | 'Suite' | null;
    minPrice: number | null;
    maxPrice: number | null;
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class FilterPanelComponent implements OnInit {
  availableTypes: ('Single' | 'Double' | 'Suite')[] = ['Single', 'Double', 'Suite'];
  
  @Output() filterChange = new EventEmitter<RoomFilter>();
  @Output() closePanel = new EventEmitter<void>();
  
  filterForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.filterForm = this.fb.group({
          type: [null], 
          minPrice: [null],
          maxPrice: [null]
      });
  }

  onTypeChange(type: 'Single' | 'Double' | 'Suite' | null): void {
      const currentType = this.filterForm.get('type')?.value;
      const newType = currentType === type ? null : type;
      this.filterForm.get('type')?.setValue(newType);
      
      this.applyFilter(); 
  }

  applyFilter(): void {
      const formValue = this.filterForm.value;
      
      const filterData: RoomFilter = {
          type: formValue.type,
          minPrice: formValue.minPrice ? Number(formValue.minPrice) : null,
          maxPrice: formValue.maxPrice ? Number(formValue.maxPrice) : null,
      };
      
      this.filterChange.emit(filterData);
  }

  resetFilter(): void {
      this.filterForm.reset({
          type: null,
          minPrice: null,
          maxPrice: null
      });
      this.applyFilter(); 
  }
  
  closeClick(): void {
    this.closePanel.emit();
  }
}