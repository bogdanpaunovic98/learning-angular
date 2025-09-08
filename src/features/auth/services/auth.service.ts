import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '@src/core/model/types.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/users/auth', credentials);
  }

  register(payload: RegisterRequest): Observable<string> {
    return this.http.post('/users', payload, { responseType: 'text' });
  }
}
