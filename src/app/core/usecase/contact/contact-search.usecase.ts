import { Observable } from 'rxjs';
import { ContactInterface } from '../../model/contact/contact.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { ContactSearchRepositories } from '../../repositories/contact/contact-search.repositories';

@Injectable({providedIn: 'root'})
export class ContactSearchUseCase implements UseCase<any, ContactInterface> {
  constructor(private  contactSearchRepositories: ContactSearchRepositories) {}

  execute(param: string): Observable<ContactInterface> {
    return this.contactSearchRepositories.getContact(param);
  }
}
