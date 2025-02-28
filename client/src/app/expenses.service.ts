import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from './expense';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private url = 'http://localhost:5200';

  public filterSubject = new BehaviorSubject<{ searchTerm: string; category: string }>({ searchTerm: '', category: '' });

  constructor(private httpClient: HttpClient) { }

  getFilteredExpenses(): Observable<Expense[]> {
    return combineLatest([
      this.httpClient.get<Expense[]>(`${this.url}/expenses`),
      this.filterSubject.asObservable()
    ]).pipe(
      map(([expenses, filters]) => {
        return expenses.filter(expense => {
          const matchesSearch =
            expense.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            expense.amount.toString().includes(filters.searchTerm.toLowerCase()) ||
            expense.date.toLowerCase().includes(filters.searchTerm.toLowerCase());
          const matchesCategory = !filters.category || expense.category === filters.category;
          return matchesSearch && matchesCategory;
        });
      })
    );
  }

  setFilters(filters: { searchTerm: string; category: string }) {
    this.filterSubject.next(filters);
  }

  getExpenses() {
    return this.httpClient.get<Expense[]>(`${this.url}/expenses`);
  }

  getExpense(id: string) {
    return this.httpClient.get<Expense>(`${this.url}/expenses/${id}`);
  }

  createExpense(expense: Expense) {
    return this.httpClient.post(`${this.url}/expenses`, expense, { responseType: 'text' });
  }

  updateExpense(id: string, expense: Expense) {
    return this.httpClient.put(`${this.url}/expenses/${id}`, expense, { responseType: 'text' });
  }

  deleteExpense(id: string) {
    return this.httpClient.delete(`${this.url}/expenses/${id}`, { responseType: 'text' });
  }
}