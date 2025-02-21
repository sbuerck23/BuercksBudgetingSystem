import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from '../expense-list/expense-list.component';
import { Expense } from '../expense';

@Component({
  selector: 'app-expense-dialog',
  imports: [MatCardModule, MatDialogModule],
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.scss'
})
export class ExpenseDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ExpenseDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly expense: Expense = this.data
}
