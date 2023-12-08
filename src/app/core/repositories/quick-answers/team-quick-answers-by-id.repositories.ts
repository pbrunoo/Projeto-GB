import { QuickAnswersResponse } from '../../data/repository/quick-answers/quick-answers.entity';
import { CompanyInterface } from '../../model/company/company.interface';
import { Observable } from 'rxjs';

export abstract class TeamQuickAnswersByIdRepositories {
  abstract getTeamQuickAnswersById(param: any): Observable<QuickAnswersResponse>;
}
