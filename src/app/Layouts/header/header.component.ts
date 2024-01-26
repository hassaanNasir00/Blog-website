import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username: string | null = null;
  isLoggedIn = this.authService.isLoggedIn;

  constructor(private authService: AuthService) {
    this.authService.userNameSubject.subscribe((name) => {
      this.username = name;
    });
  }

  loggedOut(): void {
    this.authService.loggedOut();
  }
}
