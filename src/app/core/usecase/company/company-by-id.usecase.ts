import { CompanyInterface } from '../../model/company/company.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CompanyByIdRepositories } from '../../repositories/company/company-by-id.repositories';

@Injectable({providedIn: 'root'})
export class CompanyByIdUseCase implements UseCase <any, CompanyInterface> {
  constructor(private companyByIdRepositories: CompanyByIdRepositories){}

  execute(param: any): Observable<CompanyInterface> {
    return this.companyByIdRepositories.getCompanyById(param);
  }
}
