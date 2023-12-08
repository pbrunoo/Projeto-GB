import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';
import { Observable } from 'rxjs';

export abstract class CreateTeamQuickAnswersRepositories {
  abstract createTeamQuickAnswers(params: any): Observable<QuickAnswersResponse>;
}
