import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketEditComponent } from './ticket-edit.component';

const routes: Routes = [{ path: '', component: TicketEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TicketEditRoutesModule { }
