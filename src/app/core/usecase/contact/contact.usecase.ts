import { Observable } from 'rxjs';
import { ContactInterface } from './../../model/contact/contact.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { ContactRepositories } from '../../repositories/contact/contact.repositories';

@Injectable({providedIn: 'root'})
export class ContactUseCase implements UseCase<any, ContactInterface> {
  constructor(private contactRepositories: ContactRepositories) {}

  execute(): Observable<ContactInterface> {
    return this.contactRepositories.getAllContact();
  }
}
