import { Injectable } from '@angular/core';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';
import { CreateUserRepositories } from '../../repositories/user/create-user.repositories';

@Injectable({providedIn: 'root'})
export abstract class CreateUserUseCase implements UseCase <any, User> {

  constructor(private createUserRepositories: CreateUserRepositories) {}

  execute(param: any): Observable<User> {
    return this.createUserRepositories.createUser(param);
  }
}
