import { ModelMessageResponse } from '../../data/repository/model-message/model-message.entity';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';
import { DeleteQuickAnswersRepositories } from '../../repositories/quick-answers/delete-quick-answers.repositories';

@Injectable({providedIn: 'root'})
export class DeleteQuickAnswersUseCase implements UseCase <any, QuickAnswersResponse> {
  constructor(private deleteQuickAnswersRepositories: DeleteQuickAnswersRepositories){}

  execute(params: string): Observable<ModelMessageResponse> {
    return this.deleteQuickAnswersRepositories.deleteQuickAnswers(params);
  }
}
