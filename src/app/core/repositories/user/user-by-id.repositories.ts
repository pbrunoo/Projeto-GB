import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';

export abstract class UserByIdRepositories {
  abstract getUserById(param: string): Observable<User>;
}
