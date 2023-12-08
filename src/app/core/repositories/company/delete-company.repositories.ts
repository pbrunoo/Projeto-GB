import { CompanyInterface } from '../../model/company/company.interface';
import { Observable } from 'rxjs';

export abstract class DeleteCompanyRepositories {
  abstract deleteCompany(params: string): Observable<CompanyInterface>;
}
