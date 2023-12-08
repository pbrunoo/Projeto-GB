import { Injectable } from '@angular/core';
import { ContactInterface } from './../../model/contact/contact.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { DeleteContactRepositories } from '../../repositories/contact/delete-contact.repositories';

@Injectable({providedIn: 'root'})
export abstract class DeleteContactUseCase implements UseCase <any, ContactInterface> {

  constructor(private deleteContactRepositories: DeleteContactRepositories) {}

  execute(param: string): Observable<ContactInterface> {
    return this.deleteContactRepositories.deleteContact(param);
  }
}
