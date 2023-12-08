import { CompanyInterface } from './../../model/company/company.interface';
import { Observable } from 'rxjs';

export abstract class CompanyRepositories {
  abstract getAllCompany(): Observable<CompanyInterface>;
}
