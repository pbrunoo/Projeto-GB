import { botsGreentingResponse } from './../../data/repository/bots-greeting/bots-greeting.entity';
import { Observable } from 'rxjs';

export abstract class DeleteBotsGreetingRepositories {
  abstract deleteBotGreeting(params: string): Observable<botsGreentingResponse>;
}
