import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';

export abstract class UserSearchRepositories {
  abstract getUser(param: string): Observable<User>;
}
