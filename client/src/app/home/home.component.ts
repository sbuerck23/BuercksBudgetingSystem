import { Component } from '@angular/core';
import { ExpenseListComponent } from "../expense-list/expense-list.component";

@Component({
  selector: 'app-home',
  imports: [ExpenseListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
