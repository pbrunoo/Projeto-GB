import { NumberWhatsappInterface } from './../../model/number-whatsapp/number-whatsapp.model';
import { TeansInterface } from '../../model/teans/teans.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CreateTeansRepositories } from '../../repositories/teans/create-teans.repositories';
import { CreateNumberWhatsappRepositories } from '../../repositories/number-whatsapp/create-number-whatsapp.repositories';

@Injectable({providedIn: 'root'})
export class CreateNumberWhatsappUseCase implements UseCase <any, NumberWhatsappInterface> {
  constructor(private createNumberWhatsappRepositories: CreateNumberWhatsappRepositories){}

  execute(params: string): Observable<NumberWhatsappInterface> {
    return this.createNumberWhatsappRepositories.createNumberWhatsapp(params);
  }
}
