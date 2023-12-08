import { CompanyInterface } from '../../model/company/company.interface';import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";import { Observable } from 'rxjs';import { BotsGreetingRepositories } from '../../repositories/bots-greeting/bots-greeting.repositories';
import { ModelMessageInterface } from '../../model/model-message/model-message.interface';
import { ModelMessageRepositories } from '../../repositories/model-message/model-message.repositories';

@Injectable({providedIn: 'root'})
export class ModelMessageUseCase implements UseCase <any, ModelMessageInterface> {
  constructor(private modelMessageRepositories: ModelMessageRepositories){}

  execute(): Observable<ModelMessageInterface> {
    return this.modelMessageRepositories.getAll();
  }
}
