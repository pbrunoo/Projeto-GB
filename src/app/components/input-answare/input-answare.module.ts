import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAnswareComponent } from './input-answare.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploaderImageModule } from '../uploader-image/uploader-image.module';
import { FormControlPipeModule } from 'src/app/behavior/pipes/form-control';

@NgModule({
  declarations: [InputAnswareComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UploaderImageModule,
    FormControlPipeModule,
  ],
  exports: [InputAnswareComponent],
})
export class InputAnswareModule {}
