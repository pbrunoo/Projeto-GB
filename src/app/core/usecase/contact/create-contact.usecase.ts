import { Injectable } from '@angular/core';
import { ContactInterface } from '../../model/contact/contact.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { CreateContactRepositories } from '../../repositories/contact/create-contact.repositories';

@Injectable({providedIn: 'root'})
export abstract class CreateContactUseCase implements UseCase <any, ContactInterface> {

  constructor(private createContactRepositories: CreateContactRepositories) {}

  execute(param: any): Observable<ContactInterface> {
    return this.createContactRepositories.createContact(param);
  }
}
