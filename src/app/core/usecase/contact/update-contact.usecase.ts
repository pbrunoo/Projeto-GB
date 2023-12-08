import { Injectable } from '@angular/core';
import { ContactInterface } from '../../model/contact/contact.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { UpdateContactRepositories } from '../../repositories/contact/update-contact.repositories';

@Injectable({providedIn: 'root'})
export abstract class UpdateContactUseCase implements UseCase <any, ContactInterface> {

  constructor(private updateContactRepositories: UpdateContactRepositories) {}

  execute(param: any): Observable<ContactInterface> {
    return this.updateContactRepositories.updateContact(param);
  }
}
