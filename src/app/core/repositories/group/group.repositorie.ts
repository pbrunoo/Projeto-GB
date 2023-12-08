import { Observable } from 'rxjs';
import { GroupModel } from '../../model/group/group.model';

export abstract class GroupRepositories {
  abstract getAllGroup(): Observable<GroupModel>;

}
