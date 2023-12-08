import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderImageComponent } from './uploader-image.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UploaderImageComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UploaderImageComponent],
})
export class UploaderImageModule {}
