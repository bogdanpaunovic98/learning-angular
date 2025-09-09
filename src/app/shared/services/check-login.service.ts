import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginService {
  private http = inject(HttpClient);

  checkLogin(): Observable<string> {
    return this.http.get('/users/me', { responseType: 'text', withCredentials: true });
  }
}
