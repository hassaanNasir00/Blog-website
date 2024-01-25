import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get username(): AbstractControl {
    return this.registerForm.controls['username'];
  }
  get email(): AbstractControl {
    return this.registerForm.controls['email'];
  }
  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }
  onSubmit(): void {
    localStorage.setItem('username', this.registerForm.value.username);
    localStorage.setItem('email', this.registerForm.value.email);
    localStorage.setItem('password', this.registerForm.value.password);

    this.router.navigate(['/login']);
  }
}
