import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { botsGreentingInterface } from '../../model/bots-greeting/bots-greeting.interface';
import { CreateBotsGreetingRepositories } from '../../repositories/bots-greeting/create-bots-greeting.repositories';

@Injectable({providedIn: 'root'})
export class CreateBotsGreetingUseCase implements UseCase <any, botsGreentingInterface> {
  constructor(private createBotsGreetingRepositories: CreateBotsGreetingRepositories){}

  execute(params: string): Observable<botsGreentingInterface> {
    return this.createBotsGreetingRepositories.createBotsGreeting(params);
  }
}
