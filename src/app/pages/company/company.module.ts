import { NgxMaskModule } from 'ngx-mask';
import { CompanyRoutesModule } from './company.routing';
import { CompanyComponent } from './company.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../components/shared.module";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [CompanyComponent],
    imports: [
        CommonModule,
        CompanyRoutesModule,
        NgbAlertModule,
        SharedModule,
        NgbTooltipModule,
        NgbAccordionModule,
        NgxMaskModule
    ]
})
export class CompanyModule { }
