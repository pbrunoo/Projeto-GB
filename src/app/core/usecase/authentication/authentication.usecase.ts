import { Observable } from 'rxjs';
import { AuthenticationInterface } from 'src/app/core/model/authentication/authentication.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { AuthenticationRepositories } from 'src/app/core/repositories/authentication/authentication.repositories';

@Injectable({providedIn: 'root'})
export class AuthenticationUseCases implements UseCase<any, AuthenticationInterface> {
  constructor(private authenticationRepositories: AuthenticationRepositories) {}

  execute(params: AuthenticationInterface): Observable<AuthenticationInterface> {
    return this.authenticationRepositories.getAuthentication(params);
  }
}
