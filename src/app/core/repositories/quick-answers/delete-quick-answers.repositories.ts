import { Observable } from 'rxjs';
import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';

export abstract class DeleteQuickAnswersRepositories {
  abstract deleteQuickAnswers(params: string): Observable<QuickAnswersResponse>;
}
