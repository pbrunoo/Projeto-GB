import { environment } from 'src/environments/environment';
import { AuthenticationStorageService } from './authentication-storage.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private authenticationStorageService: AuthenticationStorageService) {}

  logout() {
    this.authenticationStorageService.clearToken();

    window.location.replace(`${environment.URLBase}/auth`);
  }
}
