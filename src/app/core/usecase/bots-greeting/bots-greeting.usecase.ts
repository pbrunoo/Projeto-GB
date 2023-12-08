import { CompanyInterface } from '../../model/company/company.interface';import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";import { Observable } from 'rxjs';import { BotsGreetingRepositories } from '../../repositories/bots-greeting/bots-greeting.repositories';

@Injectable({providedIn: 'root'})
export class BotsGreetingUseCase implements UseCase <any, CompanyInterface> {
  constructor(private botsGreetingRepositories: BotsGreetingRepositories){}

  execute(): Observable<CompanyInterface> {
    return this.botsGreetingRepositories.getAll();
  }
}
