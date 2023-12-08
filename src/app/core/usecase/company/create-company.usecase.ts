import { CompanyInterface } from '../../model/company/company.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CreateCompanyRepositories } from '../../repositories/company/create-company.repositories';

@Injectable({providedIn: 'root'})
export class CreateCompanyUseCase implements UseCase <any, CompanyInterface> {
  constructor(private createCompanyRepositories: CreateCompanyRepositories){}

  execute(params: string): Observable<CompanyInterface> {
    return this.createCompanyRepositories.createCompany(params);
  }
}
