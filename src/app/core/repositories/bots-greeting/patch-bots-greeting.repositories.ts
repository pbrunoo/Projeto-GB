import { botsGreentingResponse } from './../../data/repository/bots-greeting/bots-greeting.entity';
import { Observable } from 'rxjs';

export abstract class PatchBotsGreetingRepositories {
  abstract activeOrDesactive(params: any): Observable<botsGreentingResponse>;
}
