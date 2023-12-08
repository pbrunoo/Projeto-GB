import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupPipe } from './form-group.pipe';

@NgModule({
  declarations: [
    FormGroupPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [FormGroupPipe],
})
export class FormGroupPipeModule {}
