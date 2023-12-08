import { ContactInterface } from '../../model/contact/contact.interface';
import { Observable } from 'rxjs';

export abstract class UpdateContactRepositories {
  abstract updateContact(params: any): Observable<ContactInterface>;
}
