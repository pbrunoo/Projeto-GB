import { ContactInterface } from './../../model/contact/contact.interface';
import { Observable } from 'rxjs';
export abstract class ContactRepositories {
  abstract getAllContact(): Observable<ContactInterface>;
}
