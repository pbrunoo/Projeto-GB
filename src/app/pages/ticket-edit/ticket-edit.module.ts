import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketEditComponent } from './ticket-edit.component';
import { SharedModule } from 'src/app/components/shared.module';
import { TicketEditRoutesModule } from './ticket-edit.routing';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputAnswareModule } from 'src/app/components/input-answare/input-answare.module';

@NgModule({
  declarations: [TicketEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    TicketEditRoutesModule,
    NgbTooltipModule,
    NgbAlertModule,
    SharedModule,
    ReactiveFormsModule,
    InputAnswareModule
  ]
})
export class TicketEditModule { }
