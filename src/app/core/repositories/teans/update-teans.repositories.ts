import { TeansInterface } from './../../model/teans/teans.interface';
import { Observable } from 'rxjs';

export abstract class UpdateTeansRepositories {
  abstract updateTeans(params: any): Observable<TeansInterface>;
}
