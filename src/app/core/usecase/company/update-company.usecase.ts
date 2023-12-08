import { CompanyInterface } from '../../model/company/company.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UpdateCompanyRepositories } from '../../repositories/company/update-company.repositories';

@Injectable({providedIn: 'root'})
export class UpdateCompanyUseCase implements UseCase <any, CompanyInterface> {
  constructor(private updateCompanyRepositories: UpdateCompanyRepositories){}

  execute(params: any): Observable<CompanyInterface> {
    return this.updateCompanyRepositories.updateCompany(params);
  }
}
