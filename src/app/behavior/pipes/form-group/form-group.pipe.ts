import { FormGroup } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formGroup'
})
export class FormGroupPipe implements PipeTransform {
  transform(form: FormGroup, key: string): FormGroup {
    return (form.get(key) as FormGroup) ?? new FormGroup({});
  }
}
