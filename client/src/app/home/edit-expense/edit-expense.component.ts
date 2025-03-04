import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ExpensesService } from '../../expenses.service';
import { DialogData } from '../expense-list/expense-list.component';
import { Expense } from '../../expense';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-edit-expense',
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule, MatOptionModule, MatDatepickerModule, MatSelectModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss'
})
export class EditExpenseComponent {
  readonly dialogRef = inject(MatDialogRef<EditExpenseComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  public id: string = this.data._id;
  public category: string = this.data.category;
  public description: string = this.data.description;
  public amount: number = this.data.amount;
  public date: Date = new Date(this.data.date);
  public userId: string;

  constructor(private expensesService: ExpensesService, private authService: AuthService) { this.userId = this.authService.getUserId() }

  public editExpense() {
    this.expensesService.updateExpense(
      this.id,
      { userId: this.userId, category: this.category, description: this.description, amount: this.amount, date: this.date.toLocaleDateString() }
    ).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        alert('Failed to update expense');
        console.error(error);
      },
    });
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
