import { CompanyInterface } from './../../model/company/company.interface';import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";import { Observable } from 'rxjs';
import { CompanyRepositories } from '../../repositories/company/company.repositories';

@Injectable({providedIn: 'root'})
export class CompanyUseCase implements UseCase <any, CompanyInterface> {
  constructor(private companyRepositories: CompanyRepositories){}

  execute(): Observable<CompanyInterface> {
    return this.companyRepositories.getAllCompany();
  }
}
