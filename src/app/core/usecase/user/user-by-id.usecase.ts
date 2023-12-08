import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';import { User } from '../../model/user/user.model';
import { UserSearchRepositories } from '../../repositories/user/user-search.repositories';
import { UserByIdRepositories } from '../../repositories/user/user-by-id.repositories';

@Injectable({providedIn: 'root'})
export class UserByIdUseCase implements UseCase<any, User> {
  constructor(private  userByIdRepositories: UserByIdRepositories) {}

  execute(param: string): Observable<User> {
    return this.userByIdRepositories.getUserById(param);
  }
}
