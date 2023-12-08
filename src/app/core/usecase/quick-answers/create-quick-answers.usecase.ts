import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';
import { CreateQuickAnswersRepositories } from '../../repositories/quick-answers/create-quick-answers.repositories';

@Injectable({providedIn: 'root'})
export class CreateQuickAnwersUseCase implements UseCase <any, QuickAnswersResponse> {
  constructor(private createQuickAnswersRepositories: CreateQuickAnswersRepositories){}

  execute(params: string): Observable<QuickAnswersResponse> {
    return this.createQuickAnswersRepositories.createQuickAnswers(params);
  }
}
