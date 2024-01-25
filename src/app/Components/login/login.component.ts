import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    const loginEmailValue = this.loginForm.value.email;
    const loginPasswordValue = this.loginForm.value.password;
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (
      storedEmail == loginEmailValue &&
      storedPassword == loginPasswordValue
    ) {
      this.authService.loggedIn();
      this.router.navigate(['/home']);
    }
  }
}
