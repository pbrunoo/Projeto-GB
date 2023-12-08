import { NumberWhatsappRoutesModule } from './number-whatsapp.routing';
import { NumberWhatsappComponent } from './number-whatsapp.component';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../components/shared.module";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [NumberWhatsappComponent],
    imports: [
        CommonModule,
        NgbAlertModule,
        SharedModule,
        NgbTooltipModule,
        NgbAccordionModule,
        NgxMaskModule,
        NumberWhatsappRoutesModule
    ]
})
export class NumberWhatsappModule { }
