import { CompanyInterface } from '../../model/company/company.interface';
import { Observable } from 'rxjs';

export abstract class CompanySearchRepositories {
  abstract getCompany(param: string): Observable<CompanyInterface>;
}
