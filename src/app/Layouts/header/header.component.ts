import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username: any;
  isLoggedIn = this.authService.isLoggedIn;

  constructor(private authService: AuthService) {
    this.authService.userNameSubject.subscribe((name) => {
      this.username = name;
    });
  }

  loggedOut() {
    this.authService.loggedOut();
  }
}
