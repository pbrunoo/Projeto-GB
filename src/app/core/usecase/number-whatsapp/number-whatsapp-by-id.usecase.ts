import { NumberWhatsappInterface } from './../../model/number-whatsapp/number-whatsapp.model';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { NumberWhatsappRepositories } from '../../repositories/number-whatsapp/number-whatsapp.repositories';
import { NumberWhatsappByIdRepositories } from '../../repositories/number-whatsapp/number-whatsapp-by-id.repositories';
@Injectable({providedIn: 'root'})
export class NumberWhatsappByIdUseCase implements UseCase <any, NumberWhatsappInterface> {
  constructor(private numberWhatsappByIdRepositories: NumberWhatsappByIdRepositories){}

  execute(param: any): Observable<NumberWhatsappInterface> {
    return this.numberWhatsappByIdRepositories.getNumberWhatsappById(param);
  }
}
