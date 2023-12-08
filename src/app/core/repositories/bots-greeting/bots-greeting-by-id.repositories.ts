import { CompanyInterface } from '../../model/company/company.interface';
import { Observable } from 'rxjs';

export abstract class BotsGreetingByIdRepositories {
  abstract getById(param: any): Observable<CompanyInterface>;
}
