import { TeansInterface } from './../../model/teans/teans.interface';
import { Observable } from 'rxjs';

export abstract class PatchTeansRepositories {
  abstract activeOrDesactive(params: any): Observable<TeansInterface>;
}
