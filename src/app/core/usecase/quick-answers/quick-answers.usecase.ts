import { CompanyInterface } from '../../model/company/company.interface';import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";import { Observable } from 'rxjs';import { BotsGreetingRepositories } from '../../repositories/bots-greeting/bots-greeting.repositories';
import { ModelMessageInterface } from '../../model/model-message/model-message.interface';
import { ModelMessageRepositories } from '../../repositories/model-message/model-message.repositories';
import { QuickAnswersRepositories } from '../../repositories/quick-answers/quick-answers.repositories';
import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';

@Injectable({providedIn: 'root'})
export class QuickAnswerUseCase implements UseCase <any, QuickAnswersResponse> {
  constructor(private quickAnswersRepositories: QuickAnswersRepositories){}

  execute(): Observable<QuickAnswersResponse> {
    return this.quickAnswersRepositories.getAllQuickAnswers();
  }
}
