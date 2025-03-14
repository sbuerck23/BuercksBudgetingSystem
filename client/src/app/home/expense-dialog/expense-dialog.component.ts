import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from '../expense-list/expense-list.component';
import { Expense } from '../../expense';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyFormatPipe } from '../../currency-format.pipe';

@Component({
  selector: 'app-expense-dialog',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, CurrencyFormatPipe],
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.scss'
})
export class ExpenseDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ExpenseDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly expense: Expense = this.data;

  public closeDialog() {
    this.dialogRef.close();
  }
}
