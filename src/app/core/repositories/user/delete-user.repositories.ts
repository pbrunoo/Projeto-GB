import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';

export abstract class DeleteUserRepositories {
  abstract deleteUser(params: any): Observable<User>;
}
