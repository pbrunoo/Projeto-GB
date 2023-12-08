import { CompanyInterface } from '../../model/company/company.interface';
import { Observable } from 'rxjs';

export abstract class CreateCompanyRepositories {
  abstract createCompany(params: any): Observable<CompanyInterface>;
}
