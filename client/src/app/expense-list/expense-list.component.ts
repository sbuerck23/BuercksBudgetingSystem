import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Expense } from '../expense';
import { Observable } from 'rxjs';
import { ExpensesService } from '../expenses.service';
import { AsyncPipe } from '@angular/common';
import { CurrencyFormatPipe } from '../currency-format.pipe';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';

export interface DialogData {
  _id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-expense-list',
  imports: [MatListModule, MatCardModule, AsyncPipe, CurrencyFormatPipe, MatButtonModule,],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  public expenses$: Observable<Expense[]>;

  constructor(private expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.expenses$ = this.expensesService.getExpenses();
  }

  public openExpenseDialog(expense: Expense) {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      data: { _id: expense._id, category: expense.category, description: expense.description, amount: expense.amount, date: expense.date },
    });
  }
}
