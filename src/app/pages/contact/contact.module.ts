import { NgxMaskModule } from 'ngx-mask';
import {  ContactRoutesModule } from './contact.routing';
import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../components/shared.module";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [ContactComponent],
    imports: [
        CommonModule,
        ContactRoutesModule,
        NgbAlertModule,
        SharedModule,
        NgbTooltipModule,
        NgbAccordionModule,
        NgxMaskModule
    ]
})
export class ContactModule { }
