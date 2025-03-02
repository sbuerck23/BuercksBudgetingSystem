import { Component } from '@angular/core';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { FilterComponent } from './filter/filter.component';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-home',
  imports: [ExpenseListComponent, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private expensesService: ExpensesService) { }

  applyFilters(filters: { searchTerm: string; category: string }) {
    this.expensesService.setFilters(filters);
  }
}
