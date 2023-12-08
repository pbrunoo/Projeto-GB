import { Injectable } from '@angular/core';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';
import { UpdateUserRepositories } from '../../repositories/user/update-user.repositories';

@Injectable({providedIn: 'root'})
export abstract class UpdateUserUseCase implements UseCase <any, User> {

  constructor(private updateUserRepositories: UpdateUserRepositories) {}

  execute(param: any): Observable<User> {
    return this.updateUserRepositories.updateUser(param);
  }
}
