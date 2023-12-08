import { CompanyInterface } from '../../model/company/company.interface';import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";import { Observable } from 'rxjs';import { BotsGreetingRepositories } from '../../repositories/bots-greeting/bots-greeting.repositories';
import { BotsGreetingByIdRepositories } from '../../repositories/bots-greeting/bots-greeting-by-id.repositories';

@Injectable({providedIn: 'root'})
export class BotsGreetingByIdUseCase implements UseCase <any, CompanyInterface> {
  constructor(private botsGreetingByIdRepositories: BotsGreetingByIdRepositories){}

  execute(param: any): Observable<CompanyInterface> {
    return this.botsGreetingByIdRepositories.getById(param);
  }
}
