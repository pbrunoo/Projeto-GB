import { ModelMessageInterface } from './../../model/model-message/model-message.interface';
import { Observable } from 'rxjs';

export abstract class CreateModelMessageRepositories {
  abstract createBotsModelMessage(params: any): Observable<ModelMessageInterface>;
}
