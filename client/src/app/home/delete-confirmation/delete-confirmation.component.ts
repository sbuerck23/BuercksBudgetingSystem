import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../expense-list/expense-list.component';
import { ExpensesService } from '../../expenses.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-confirmation',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmationComponent>);
  readonly id = inject<DialogData>(MAT_DIALOG_DATA)._id;

  constructor(private expensesService: ExpensesService) { }

  public deleteExpense() {
    this.expensesService.deleteExpense(this.id).subscribe({
      next: () => this.dialogRef.close()
    });
  }

  public cancel() {
    this.dialogRef.close();
  }
}
