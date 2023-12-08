import { HomeRoutesModule } from './home.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../../components/shared.module";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutesModule,
        NgbAlertModule,
        SharedModule
    ]
})
export class HomeModule { }
