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
import { RegisterRequest } from '@src/core/model/environment.model';

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
      newPassword: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      confirmNewPassword: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      firstname: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      lastname: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      contactPhone: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
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
    const formValue = this.registrationForm.getRawValue();
    const payload: RegisterRequest = {
      username: formValue.username,
      password: {
        newPassword: formValue.newPassword,
        newPasswordConfirm: formValue.confirmNewPassword,
      },
      firstName: formValue.firstname,
      lastName: formValue.lastname,
      userContactInfo: {
        email: formValue.email,
        contactPhone: formValue.contactPhone,
      },
    };
    this.authService
      .register(payload)
      .pipe(
        finalize(() => this.loadingService.hide()), // Always runs, success or error
      )
      .subscribe({
        next: (response: unknown) => {
          console.log('Registration successful:', response);
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
        },
      });
  }
}
