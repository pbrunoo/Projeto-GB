import { botsGreentingResponse } from './../../data/repository/bots-greeting/bots-greeting.entity';
import { botsGreentingInterface } from './../../model/bots-greeting/bots-greeting.interface';import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';import { PatchBotsGreetingRepositories } from '../../repositories/bots-greeting/patch-bots-greeting.repositories';

@Injectable({providedIn: 'root'})
export class PatchBotsGreetingUseCase implements UseCase <any, botsGreentingResponse> {
  constructor(private patchBotsGreetingRepositories: PatchBotsGreetingRepositories){}

  execute(params: any): Observable<botsGreentingResponse> {
    return this.patchBotsGreetingRepositories.activeOrDesactive(params);
  }
}
