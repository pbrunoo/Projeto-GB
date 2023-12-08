import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { GroupModel } from '../../model/group/group.model';
import { GroupRepositories } from '../../repositories/group/group.repositorie';

@Injectable({providedIn: 'root'})
export class GroupUseCase implements UseCase <any, GroupModel> {
  constructor(private groupRepositories: GroupRepositories){}

  execute(): Observable<GroupModel> {
    return this.groupRepositories.getAllGroup();
  }
}
