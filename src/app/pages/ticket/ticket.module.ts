import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { SharedModule } from 'src/app/components/shared.module';
import { TicketRoutesModule } from './ticket.routing';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TicketComponent],
  imports: [
    CommonModule,
    FormsModule,
    TicketRoutesModule,
    NgbTooltipModule,
    NgbAlertModule,
    SharedModule
  ]
})
export class TicketModule { }
