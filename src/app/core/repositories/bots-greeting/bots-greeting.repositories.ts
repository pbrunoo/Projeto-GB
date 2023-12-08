import { CompanyInterface } from '../../model/company/company.interface';
import { Observable } from 'rxjs';

export abstract class BotsGreetingRepositories {
  abstract getAll(): Observable<CompanyInterface>;
}
