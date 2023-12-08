import { TeansInterface } from './../../model/teans/teans.interface';
import { Observable } from 'rxjs';

export abstract class DeleteTeansRepositories {
  abstract deleteTeans(params: string): Observable<TeansInterface>;
}
