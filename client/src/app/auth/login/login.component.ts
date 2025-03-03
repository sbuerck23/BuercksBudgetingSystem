import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInput, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public username: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router) { }

  public login() {
    this.authService.getUser({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert(error['error']);
      }
    });;
  }
}
