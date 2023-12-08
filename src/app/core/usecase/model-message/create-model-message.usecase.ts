import { ModelMessageInterface } from './../../model/model-message/model-message.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { botsGreentingInterface } from '../../model/bots-greeting/bots-greeting.interface';
import { CreateBotsGreetingRepositories } from '../../repositories/bots-greeting/create-bots-greeting.repositories';
import { CreateModelMessageRepositories } from '../../repositories/model-message/create-model-message.repositories';

@Injectable({providedIn: 'root'})
export class CreateModelMessageUseCase implements UseCase <any, ModelMessageInterface> {
  constructor(private createModelMessageRepositories: CreateModelMessageRepositories){}

  execute(params: string): Observable<ModelMessageInterface> {
    return this.createModelMessageRepositories.createBotsModelMessage(params);
  }
}
