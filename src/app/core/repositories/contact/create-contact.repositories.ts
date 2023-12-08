import { ContactInterface } from '../../model/contact/contact.interface';
import { Observable } from 'rxjs';

export abstract class CreateContactRepositories {
  abstract createContact(params: any): Observable<ContactInterface>;
}
