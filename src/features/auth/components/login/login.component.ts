import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LoginService } from '@src/features/auth/services/login.service';
import { LoginResponse } from '@src/core/model/environment.model';
import { LoadingService } from '@src/app/shared/services/loading.service';

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

  private loginService = inject(LoginService);
  private loadingService = inject(LoadingService);

  onLogin(): void {
    this.loadingService.show();
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login successful:', response);
        this.loadingService.hide();
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        this.loadingService.hide();
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
