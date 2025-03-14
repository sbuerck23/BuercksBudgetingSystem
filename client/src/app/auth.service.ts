import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:5200';

  constructor(private httpClient: HttpClient) { }

  createUser(user: User) {
    return this.httpClient.post<{ userId: string; username: string }>(`${this.url}/users/register`, user).pipe(tap(response => {
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('username', response.username);
    }));
  }

  getUser(creds: { username: string, password: string }) {
    return this.httpClient.post<{ messege: string; userId: string; username: string }>(`${this.url}/users/login`, creds).pipe(tap(response => {
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('username', response.username);
    }));
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}
