import { CompanyInterface } from '../../model/company/company.interface';
import { Observable } from 'rxjs';
import { botsGreentingInterface } from '../../model/bots-greeting/bots-greeting.interface';

export abstract class CreateBotsGreetingRepositories {
  abstract createBotsGreeting(params: any): Observable<botsGreentingInterface>;
}
