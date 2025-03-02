import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filter',
  imports: [MatCardModule, MatExpansionModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<{ searchTerm: string; category: string }>();

  searchTerm: string = '';
  selectedCategory: string = '';

  onFilterChange() {
    this.filterChanged.emit({
      searchTerm: this.searchTerm,
      category: this.selectedCategory,
    });
  }
}
