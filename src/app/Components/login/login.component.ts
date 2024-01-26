import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get password(): AbstractControl {
    return this.loginForm.controls['password'];
  }
  get email(): AbstractControl {
    return this.loginForm.controls['email'];
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
