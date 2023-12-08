import { ModelMessageResponse } from './../../data/repository/model-message/model-message.entity';
import { Observable } from 'rxjs';

export abstract class DeleteModelMessageRepositories {
  abstract deleteModelMessage(params: string): Observable<ModelMessageResponse>;
}
