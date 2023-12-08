import { TeansInterface } from './../../model/teans/teans.interface';
import { Observable } from 'rxjs';

export abstract class CreateTeansRepositories {
  abstract createTeans(params: any): Observable<TeansInterface>;
}
