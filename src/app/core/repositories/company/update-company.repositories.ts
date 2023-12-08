import { CompanyInterface } from '../../model/company/company.interface';
import { Observable } from 'rxjs';

export abstract class UpdateCompanyRepositories {
  abstract updateCompany(params: any): Observable<CompanyInterface>;
}
