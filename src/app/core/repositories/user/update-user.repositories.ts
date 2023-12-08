import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';

export abstract class UpdateUserRepositories {
  abstract updateUser(params: any): Observable<User>;
}
