import { Observable } from 'rxjs';
import { AuthenticationStorageService } from './../services/authentication/authentication-storage.service';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(
    private authenticationStorageService: AuthenticationStorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authenticationStorageService.getToken();

    if (!token || request.url.includes('helpdesk-grupoparceirobrasil-images')) {
      return next.handle(request);
    }

    const modifiedRequest = request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    });

    return next.handle(modifiedRequest);
  }
}
