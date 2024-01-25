import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  onSubmit(name: string, email: any, password: any) {
    sessionStorage.setItem('username', name);
    console.log(name, email, password, 'checking');
  }
}
