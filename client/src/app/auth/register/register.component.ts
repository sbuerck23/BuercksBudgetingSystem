import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public username: string;
  public email: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router) { }

  public isValid(password: string): boolean {
    return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/.test(password);
  }

  public register() {
    if (!this.isValid(this.password)) {
      alert("Password must follow password rules.")
      return;
    }
    const user = { username: this.username, email: this.email, password: this.password };
    this.authService.createUser(user).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert(error['error']);
      }
    });
  }
}
