import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from './authentication.entity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class AuthenticationByTokenRepository {
  constructor(private https: HttpClient) {}

  getAuthenticationByToken(): Observable<AuthenticationResponse> {
    return this.https.get<AuthenticationResponse>(`${environment.URLBase}user/by-token`);
  }
}
