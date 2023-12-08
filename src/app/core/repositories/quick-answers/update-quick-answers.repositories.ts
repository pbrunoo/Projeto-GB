import { Observable } from 'rxjs';
import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';

export abstract class UpdateQuickAnswersRepositories {
  abstract updateQuickAnswers(params: any): Observable<QuickAnswersResponse>;
}
