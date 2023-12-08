import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';

export abstract class UserAllRepositorie{
    abstract getAllUser(): Observable<User>;
}
