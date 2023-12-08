import { TeansInterface } from './../../model/teans/teans.interface';
import { Observable } from 'rxjs';

export abstract class TeansRepositories {
  abstract getAll(): Observable<TeansInterface>;
}
