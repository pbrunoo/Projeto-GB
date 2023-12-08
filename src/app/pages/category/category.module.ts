import { CategoryRoutesModule } from './category.routing';
import { CategoryComponent } from './category.component';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../components/shared.module";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        NgbAlertModule,
        SharedModule,
        NgbTooltipModule,
        NgbAccordionModule,
        NgxMaskModule,
        CategoryRoutesModule
    ]
})
export class CategoryModule { }
