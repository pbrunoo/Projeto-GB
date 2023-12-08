import { QrCodeInterface } from './../../data/repository/whatsapp/qr-code.entity';
import { Observable } from 'rxjs';
import { ContactInterface } from '../../model/contact/contact.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { ContactRepositories } from '../../repositories/contact/contact.repositories';
import { GetQrCodeRepositories } from '../../repositories/whatsapp/get-qr-code.repositories';

@Injectable({providedIn: 'root'})
export class GetQrCodeUseCase implements UseCase<any, QrCodeInterface> {
  constructor(private getQrCodeRepositories: GetQrCodeRepositories) {}

  execute(param: any): Observable<QrCodeInterface> {
    return this.getQrCodeRepositories.getQrCode(param);
  }
}
