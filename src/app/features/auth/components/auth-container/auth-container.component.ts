import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from '@src/app/features/auth/components/login/login.component';
import { Registration } from '@src/app/features/auth/components/registration/registration.component';

@Component({
  selector: 'auth-container',
  standalone: true,
  templateUrl: 'auth-container.component.html',
  imports: [MatTab, MatTabGroup, ReactiveFormsModule, Login, Registration],
})
export class AuthContainer {}
