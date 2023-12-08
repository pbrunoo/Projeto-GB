import { NumberWhatsappInterface } from './../../model/number-whatsapp/number-whatsapp.model';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { NumberWhatsappRepositories } from '../../repositories/number-whatsapp/number-whatsapp.repositories';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NumberWhatsappUserCase implements UseCase <any, NumberWhatsappInterface> {
  constructor(private numberWhatsappRepositories: NumberWhatsappRepositories){}

  execute(): Observable<NumberWhatsappInterface> {
    return this.numberWhatsappRepositories.getAllNumberWhatsapp();
  }
}
