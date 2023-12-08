import { NgxMaskModule } from 'ngx-mask';
import {  UserRoutesModule } from './user.routing';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../components/shared.module";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [UserComponent],
    imports: [
        CommonModule,
        UserRoutesModule,
        NgbAlertModule,
        SharedModule,
        NgbTooltipModule,
        NgbAccordionModule,
        NgxMaskModule
    ]
})
export class UserModule { }
