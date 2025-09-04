import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import the full Angular Material modules needed for the form
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LoginService, LoginRequest } from './login.service';

@Component({
  selector: 'login',
  standalone: true, // This makes the component standalone
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  imports: [
    ReactiveFormsModule, // Only ReactiveFormsModule is needed for FormGroups
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(private loginService: LoginService) {}

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials: LoginRequest = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      };

      // Using POST method (typical for login)
      this.loginService.login(credentials).subscribe({
        next: (response: unknown) => {
          console.log('Login successful:', response);
          // Handle successful login (e.g., store token, navigate to dashboard)
        },
        error: (error: unknown) => {
          console.error('Login failed:', error);
          // Handle login error (e.g., show error message)
        },
      });
    } else {
      console.error('Form is invalid.');
    }
  }

  // Helper getters to easily access form controls in the template
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
