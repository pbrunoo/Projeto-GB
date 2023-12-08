import { NumberWhatsappInterface } from './../../model/number-whatsapp/number-whatsapp.model';
import { Observable } from 'rxjs';

export abstract class NumberWhatsappRepositories {
  abstract getAllNumberWhatsapp(): Observable<NumberWhatsappInterface>;
}
