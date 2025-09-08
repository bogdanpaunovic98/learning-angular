import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '@src/features/auth/services/auth.service';
import { LoadingService } from '@src/app/shared/services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'registration',
  standalone: true,
  templateUrl: 'registration.component.html',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class Registration {
  registrationForm = new FormGroup(
    {
      username: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormGroup({
        newPassword: new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        newPasswordConfirm: new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      }),
      firstName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      userContactInfo: new FormGroup({
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
        contactPhone: new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      }),
    },
    {
      validators: [
        (control: AbstractControl): ValidationErrors | null => {
          const newPassword: string = control.get('newPassword')?.value;
          const confirmNewPassword: string = control.get('confirmNewPassword')?.value;

          if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
            return { passwordMismatch: true };
          }
          return null;
        },
      ],
    },
  );

  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);

  onRegister(): void {
    this.loadingService.show();
    this.authService
      .register(this.registrationForm.getRawValue())
      .pipe(
        finalize(() => this.loadingService.hide()), // Always runs, success or error
      )
      .subscribe({
        next: (response: string) => {
          console.log('Registration successful:', response);
        },
        error: (error: Object) => {
          console.error('Registration failed:', error);
        },
      });
  }
}
