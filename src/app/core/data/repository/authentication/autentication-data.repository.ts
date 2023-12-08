import { AuthenticationResponse } from './authentication.entity';
import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root' })
export class AutenticationDataRepository {
  constructor(private http: HttpClient) {
  }

  getAuthentication(param: AuthenticationResponse): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${environment.URLBase}user/auth/signin`, param);
  }
}
