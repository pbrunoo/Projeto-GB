import { ContactInterface } from '../../model/contact/contact.interface';
import { Observable } from 'rxjs';

export abstract class ContactSearchRepositories {
  abstract getContact(param: string): Observable<ContactInterface>;
}
