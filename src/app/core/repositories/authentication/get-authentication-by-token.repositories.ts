import { Observable } from 'rxjs';
import { AuthenticationByTokenInterface, AuthenticationInterface } from './../../model/authentication/authentication.interface';

export abstract class GetAuthenticationByTokenRepositories {
  abstract getAuthenticationByToken(): Observable<AuthenticationInterface>;
}
