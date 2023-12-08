import { botsGreentingResponse } from '../../data/repository/bots-greeting/bots-greeting.entity';
import { Observable } from 'rxjs';

export abstract class PatchModelMessageRepositories {
  abstract activeOrDesactive(params: any): Observable<botsGreentingResponse>;
}
