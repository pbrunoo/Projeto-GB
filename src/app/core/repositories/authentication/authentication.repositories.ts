import { Observable } from 'rxjs';
import { AuthenticationInterface } from 'src/app/core/model/authentication/authentication.interface';

export abstract class AuthenticationRepositories {
  abstract getAuthentication(type: AuthenticationInterface): Observable<AuthenticationInterface>;
}
