import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public userNameSubject = new BehaviorSubject<string | null>(null);

  constructor(private route: Router) {
    const storedState = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');

    this.isLoggedIn.next(storedState === 'true');
    this.userNameSubject.next(storedUsername);
  }

  loggedIn(): void {
    const storedName = localStorage.getItem('username');

    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn.next(true);
    this.userNameSubject.next(storedName);
  }

  loggedOut(): void {
    localStorage.removeItem('isLoggedIn');

    this.isLoggedIn.next(false);
    this.userNameSubject.next(null);

    this.route.navigate(['/home']);
  }
}
