import { botsGreentingResponse } from './../../data/repository/bots-greeting/bots-greeting.entity';
import { Observable } from 'rxjs';

export abstract class UpdateBotsGreetingRepositories {
  abstract updateBotsGreeting(params: any): Observable<botsGreentingResponse>;
}
