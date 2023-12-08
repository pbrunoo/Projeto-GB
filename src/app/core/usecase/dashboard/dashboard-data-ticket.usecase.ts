import { Observable } from 'rxjs';
import { ContactInterface } from './../../model/contact/contact.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { ContactRepositories } from '../../repositories/contact/contact.repositories';
import { DashBoardTicketModel } from '../../model/dashboard/dashboard-ticket-data.model';
import { DashBoardRepositories } from '../../repositories/dashboard/dashboard-data.repositorie';

@Injectable({providedIn: 'root'})
export class DashboardDataTicketUseCase implements UseCase<any, DashBoardTicketModel> {
  
  constructor(private dataTicket: DashBoardRepositories) {}

  execute(): Observable<DashBoardTicketModel> {
    return this.dataTicket.getVolumeTicket();
  }
}
