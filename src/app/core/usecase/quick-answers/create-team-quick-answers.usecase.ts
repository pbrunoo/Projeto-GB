import { ModelMessageInterface } from '../../model/model-message/model-message.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { botsGreentingInterface } from '../../model/bots-greeting/bots-greeting.interface';
import { CreateBotsGreetingRepositories } from '../../repositories/bots-greeting/create-bots-greeting.repositories';
import { CreateModelMessageRepositories } from '../../repositories/model-message/create-model-message.repositories';
import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';
import { CreateTeamQuickAnswersRepositories } from '../../repositories/quick-answers/create-team-quick-answers.repositories';

@Injectable({providedIn: 'root'})
export class CreateTeamQuickAnwersUseCase implements UseCase <any, QuickAnswersResponse> {
  constructor(private createTeamQuickAnswersRepositories: CreateTeamQuickAnswersRepositories){}

  execute(params: any): Observable<QuickAnswersResponse> {
    return this.createTeamQuickAnswersRepositories.createTeamQuickAnswers(params);
  }
}
