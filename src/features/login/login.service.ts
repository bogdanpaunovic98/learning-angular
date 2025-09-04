import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'https://api.luxaldev.com/v1';

  constructor(private http: HttpClient) {}

  // POST method for actual login (more common for authentication)
  login(credentials: LoginRequest): Observable<unknown> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<unknown>(`${this.apiUrl}/users/auth`, credentials, { headers });
  }
}
