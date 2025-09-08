import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '@src/features/auth/services/auth.service';
import { LoginResponse } from '@src/core/model/environment.model';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'login',
  standalone: true,
  templateUrl: 'login.component.html',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  private loginService = inject(AuthService);
  private loadingService = inject(LoadingService);

  onLogin(): void {
    this.loginService
      .login(this.loginForm.getRawValue())
      .pipe(
        finalize(() => this.loadingService.hide()), // Always runs, success or error
      )
      .subscribe({
        next: (response: LoginResponse) => {
          console.log('Login successful:', response);
        },
        error: (error: any) => {
          console.error('Login failed:', error);
        },
      });
  }

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
