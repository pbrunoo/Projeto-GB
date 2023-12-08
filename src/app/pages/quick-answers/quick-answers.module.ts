import { QuickAnswersRoutesModule } from './teams.routing';
import { QuickAnswersComponent } from './quick-answers.component';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../components/shared.module";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [QuickAnswersComponent],
    imports: [
        CommonModule,
        QuickAnswersRoutesModule,
        NgbAlertModule,
        SharedModule,
        NgbTooltipModule,
        NgbAccordionModule,
        NgxMaskModule
    ]
})
export class QuickAnswersModule { }
