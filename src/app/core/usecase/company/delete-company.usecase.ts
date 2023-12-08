import { CompanyInterface } from '../../model/company/company.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { DeleteCompanyRepositories } from '../../repositories/company/delete-company.repositories';

@Injectable({providedIn: 'root'})
export class DeleteCompanyUseCase implements UseCase <any, CompanyInterface> {
  constructor(private deleteCompanyRepositories: DeleteCompanyRepositories){}

  execute(params: string): Observable<CompanyInterface> {
    return this.deleteCompanyRepositories.deleteCompany(params);
  }
}
