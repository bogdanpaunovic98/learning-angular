import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedInUserInfo } from '@src/app/core/model/types.model';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginService {
  private http = inject(HttpClient);

  getLoggedInUserInfo(): Observable<LoggedInUserInfo> {
    return this.http.get<LoggedInUserInfo>('/users/me', { withCredentials: true });
  }
}
