import { CompanyInterface } from '../../model/company/company.interface';
import { AuthenticationInterface } from '../../model/authentication/authentication.interface';
import { AuthenticationByTokenInterface } from '../../model/authentication/authentication.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CompanySearchRepositories } from '../../repositories/company/company-search.repositories';

@Injectable({providedIn: 'root'})
export class CompanySearchUseCase implements UseCase <any, CompanyInterface> {
  constructor(private companySearchRepositories: CompanySearchRepositories){}

  execute(param: string): Observable<CompanyInterface> {
    return this.companySearchRepositories.getCompany(param);
  }
}
