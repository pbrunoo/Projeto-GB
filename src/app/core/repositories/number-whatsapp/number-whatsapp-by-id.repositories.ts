import { NumberWhatsappInterface } from './../../model/number-whatsapp/number-whatsapp.model';
import { Observable } from 'rxjs';

export abstract class NumberWhatsappByIdRepositories {
  abstract getNumberWhatsappById(param: any): Observable<NumberWhatsappInterface>;
}
