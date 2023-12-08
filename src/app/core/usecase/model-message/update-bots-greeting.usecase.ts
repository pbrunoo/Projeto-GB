import { botsGreentingResponse } from './../../data/repository/bots-greeting/bots-greeting.entity';
import { Injectable } from '@angular/core';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { UpdateBotsGreetingRepositories } from '../../repositories/bots-greeting/update-bots-greeting.repositories';

@Injectable({providedIn: 'root'})
export abstract class UpdateBotsGreetingUseCase implements UseCase <any, botsGreentingResponse> {

  constructor(private updateBotsGreetingRepositories: UpdateBotsGreetingRepositories) {}

  execute(param: any): Observable<botsGreentingResponse> {
    return this.updateBotsGreetingRepositories.updateBotsGreeting(param);
  }
}
