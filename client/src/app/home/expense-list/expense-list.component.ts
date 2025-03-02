import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Expense } from '../../expense';
import { Observable } from 'rxjs';
import { ExpensesService } from '../../expenses.service';
import { AsyncPipe } from '@angular/common';
import { CurrencyFormatPipe } from '../../currency-format.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { NewExpenseComponent } from '../new-expense/new-expense.component';
import { MatIconModule } from '@angular/material/icon';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

export interface DialogData {
  _id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-expense-list',
  imports: [MatListModule, MatCardModule, AsyncPipe, CurrencyFormatPipe, MatButtonModule, MatIconModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  public expenses$: Observable<Expense[]>;

  constructor(private expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.expenses$ = this.expensesService.getFilteredExpenses();
  }

  public openExpenseDialog(expense: Expense) {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      data: { _id: expense._id, category: expense.category, description: expense.description, amount: expense.amount, date: expense.date },
    });
  }

  public openNewExpenseDialog() {
    const dialogRef = this.dialog.open(NewExpenseComponent);

    dialogRef.afterClosed().subscribe(r => {
      this.expenses$ = this.expensesService.getFilteredExpenses();
    });
  }

  public openEditExpenseDialog(event: Event, expense: Expense) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(EditExpenseComponent, {
      data: { _id: expense._id, category: expense.category, description: expense.description, amount: expense.amount, date: expense.date }
    });

    dialogRef.afterClosed().subscribe(r => {
      this.expenses$ = this.expensesService.getFilteredExpenses();
    });
  }

  public deleteExpense(event: Event, id: string) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { _id: id }
    });

    dialogRef.afterClosed().subscribe(r => {
      this.expenses$ = this.expensesService.getFilteredExpenses();
    });
  }
}
