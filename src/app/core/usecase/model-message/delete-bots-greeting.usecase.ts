import { ModelMessageResponse } from './../../data/repository/model-message/model-message.entity';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { DeleteModelMensagemRepository } from '../../data/repository/model-message/delete-model-message.repository';

@Injectable({providedIn: 'root'})
export class DeleteModelMessageUseCase implements UseCase <any, ModelMessageResponse> {
  constructor(private deleteModelMensagemRepository: DeleteModelMensagemRepository){}

  execute(params: string): Observable<ModelMessageResponse> {
    return this.deleteModelMensagemRepository.deleteModelMessage(params);
  }
}
