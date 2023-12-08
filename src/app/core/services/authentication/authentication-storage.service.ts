import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthenticationStorageService {
  public static AUTH_TOKENT_KEY = 'ads_help_desk';

  setToken(token: string) {
    sessionStorage.setItem(AuthenticationStorageService.AUTH_TOKENT_KEY, token);
  }

  getToken() {
    return sessionStorage.getItem(AuthenticationStorageService.AUTH_TOKENT_KEY);
  }

  clearToken() {
    sessionStorage.removeItem(AuthenticationStorageService.AUTH_TOKENT_KEY);
  }
}
