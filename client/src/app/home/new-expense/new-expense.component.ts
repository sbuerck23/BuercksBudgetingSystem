import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ExpensesService } from '../../expenses.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-new-expense',
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatDatepickerModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-expense.component.html',
  styleUrl: './new-expense.component.scss'
})
export class NewExpenseComponent {
  readonly dialogRef = inject(MatDialogRef<NewExpenseComponent>);

  public category: string;
  public description: string;
  public amount: number;
  public date: Date;

  constructor(private expensesService: ExpensesService, private authService: AuthService) { }

  public submit() {
    this.expensesService.createExpense(
      { userId: this.authService.getUserId(), category: this.category, description: this.description, amount: this.amount, date: this.date.toLocaleDateString() }
    ).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        alert('Failed to create expense');
        console.error(error);
      },
    });
  }
}
