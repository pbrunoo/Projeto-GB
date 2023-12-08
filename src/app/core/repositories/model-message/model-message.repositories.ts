import { Observable } from 'rxjs';
import { ModelMessageInterface } from '../../model/model-message/model-message.interface';

export abstract class ModelMessageRepositories {
  abstract getAll(): Observable<ModelMessageInterface>;
}
