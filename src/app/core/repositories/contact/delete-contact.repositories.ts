import { ContactInterface } from './../../model/contact/contact.interface';
import { Observable } from 'rxjs';

export abstract class DeleteContactRepositories {
  abstract deleteContact(params: string): Observable<ContactInterface>;
}
