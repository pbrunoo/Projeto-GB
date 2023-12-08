import { ModelMessageResponse } from './../../data/repository/model-message/model-message.entity';
import { botsGreentingResponse } from '../../data/repository/bots-greeting/bots-greeting.entity';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { PatchModelMessageRepositories } from '../../repositories/model-message/patch-model-message.repositories';

@Injectable({providedIn: 'root'})
export class PatchModelMessageUseCase implements UseCase <any, botsGreentingResponse> {
  constructor(private patchModelMessageRepositories: PatchModelMessageRepositories){}

  execute(params: any): Observable<ModelMessageResponse> {
    return this.patchModelMessageRepositories.activeOrDesactive(params);
  }
}
