import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';import { User } from '../../model/user/user.model';
import { UserSearchRepositories } from '../../repositories/user/user-search.repositories';

@Injectable({providedIn: 'root'})
export class UserSearchUseCase implements UseCase<any, User> {
  constructor(private  userSearchRepositories: UserSearchRepositories) {}

  execute(param: string): Observable<User> {
    return this.userSearchRepositories.getUser(param);
  }
}
