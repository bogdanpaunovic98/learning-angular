import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '@src/app/features/auth/services/auth.service';
import { LoginResponse } from '@src/app/core/model/types.model';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { redirectLoggedInUser } from '@src/app/features/auth/utils/redirectLoggedInUser';
import { CheckLoginService } from '@src/app/shared/services/check-login.service';

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

  private router = inject(Router);

  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);

  onLogin(): void {
    this.loadingService.show();
    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(
        finalize(() => this.loadingService.hide()), // Always runs, success or error
      )
      .subscribe({
        next: (response) => {
          const redirectPath = response.role === 'ADMINISTRATOR' ? '/admin-page' : '/user-page';
          this.router.navigate([redirectPath]);
        },
      });
  }
}
