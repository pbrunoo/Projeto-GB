import { ModelMessageResponse } from './../../data/repository/model-message/model-message.entity';
import { Observable } from 'rxjs';

export abstract class UpdateModelMessageRepositories {
  abstract updateBotsModelMessage(params: any): Observable<ModelMessageResponse>;
}
