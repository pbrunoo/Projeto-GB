import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';
import { Observable } from 'rxjs';

export abstract class QuickAnswersRepositories {
  abstract getAllQuickAnswers(): Observable<QuickAnswersResponse>;
}
