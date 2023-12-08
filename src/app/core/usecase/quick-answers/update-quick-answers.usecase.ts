import { botsGreentingResponse } from '../../data/repository/bots-greeting/bots-greeting.entity';
import { Injectable } from '@angular/core';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { UpdateQuickAnswersRepositories } from '../../repositories/quick-answers/update-quick-answers.repositories';
import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';

@Injectable({providedIn: 'root'})
export abstract class UpdateQuickAnswersUseCase implements UseCase <any, QuickAnswersResponse> {

  constructor(private updateQuickAnswersRepositories: UpdateQuickAnswersRepositories) {}

  execute(param: any): Observable<QuickAnswersResponse> {
    return this.updateQuickAnswersRepositories.updateQuickAnswers(param);
  }
}
