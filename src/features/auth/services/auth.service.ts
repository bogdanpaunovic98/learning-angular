import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '@src/core/model/environment.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/users/auth', credentials);
  }

  register(payload: RegisterRequest): Observable<unknown> {
    return this.http.post<unknown>('/users', payload);
  } // Since the api just returns ok, I'dont know what to put here as return type
}
