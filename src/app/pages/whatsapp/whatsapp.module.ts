import { WhatsappRoutesModule } from './whatsapp.routing';
import { WhatsappComponent } from './whatsapp.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../components/shared.module";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [WhatsappComponent],
    imports: [
        CommonModule,
        NgbAlertModule,
        WhatsappRoutesModule,
        SharedModule,
        NgbTooltipModule,
        NgbAccordionModule,
        NgxMaskModule
    ]
})
export class WhatsappModule { }
