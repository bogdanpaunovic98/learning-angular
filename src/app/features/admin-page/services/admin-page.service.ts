import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPageService {
  private http = inject(HttpClient);

  logout(): Observable<string> {
    return this.http.post('/users/logout', {}, { responseType: 'text' });
  }
}
