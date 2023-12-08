import { AuthenticationInterface } from './../../model/authentication/authentication.interface';
import { AuthenticationByTokenInterface } from '../../model/authentication/authentication.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { GetAuthenticationByTokenRepositories } from 'src/app/core/repositories/authentication/get-authentication-by-token.repositories'
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthenticationByTokenUserCase implements UseCase <any, AuthenticationInterface> {
  constructor(private getAuthenticationByTokenRepositories: GetAuthenticationByTokenRepositories){}

  execute(param: AuthenticationInterface): Observable<AuthenticationInterface> {
    return this.getAuthenticationByTokenRepositories.getAuthenticationByToken();
  }
}
