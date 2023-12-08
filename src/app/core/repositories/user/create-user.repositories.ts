import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';

export abstract class CreateUserRepositories {
  abstract createUser(params: any): Observable<User>;
}
