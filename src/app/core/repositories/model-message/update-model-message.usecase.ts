import { ModelMessageResponse } from './../../data/repository/model-message/model-message.entity';
import { Injectable } from '@angular/core';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { UpdateModelMessageRepositories } from './update-model-message.repositories';

@Injectable({providedIn: 'root'})
export abstract class UpdateModelMessageUseCase implements UseCase <any, ModelMessageResponse> {

  constructor(private updateModelMessageRepositories: UpdateModelMessageRepositories) {}

  execute(param: any): Observable<ModelMessageResponse> {
    return this.updateModelMessageRepositories.updateBotsModelMessage(param);
  }
}
