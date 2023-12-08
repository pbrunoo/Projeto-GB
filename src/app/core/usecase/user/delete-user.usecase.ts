import { CompanyInterface } from '../../model/company/company.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';
import { DeleteUserRepositories } from '../../repositories/user/delete-user.repositories';

@Injectable({providedIn: 'root'})
export class DeleteUserUseCase implements UseCase <any, User> {
  constructor(private deleteUserRepositories: DeleteUserRepositories){}

  execute(params: any): Observable<User> {
    return this.deleteUserRepositories.deleteUser(params);
  }
}
