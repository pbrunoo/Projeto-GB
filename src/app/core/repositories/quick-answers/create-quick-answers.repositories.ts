import { QuickAnswersResponse } from './../../data/repository/quick-answers/quick-answers.entity';
import { Observable } from 'rxjs';

export abstract class CreateQuickAnswersRepositories {
  abstract createQuickAnswers(params: any): Observable<QuickAnswersResponse>;
}
