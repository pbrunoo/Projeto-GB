import { NumberWhatsappInterface } from './../../model/number-whatsapp/number-whatsapp.model';
import { Observable } from 'rxjs';

export abstract class CreateNumberWhatsappRepositories {
  abstract createNumberWhatsapp(params: any): Observable<NumberWhatsappInterface>;
}
