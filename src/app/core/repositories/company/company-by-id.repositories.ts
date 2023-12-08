import { CompanyInterface } from '../../model/company/company.interface';
import { Observable } from 'rxjs';

export abstract class CompanyByIdRepositories {
  abstract getCompanyById(param: any): Observable<CompanyInterface>;
}
