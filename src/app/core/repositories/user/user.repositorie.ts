import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';

export abstract class UserRepositorie{
    abstract getUser(param: number): Observable<User>;
}
