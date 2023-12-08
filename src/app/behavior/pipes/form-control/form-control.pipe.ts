import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'formControl'
})
export class FormControlPipe implements PipeTransform {
  transform(form: FormGroup, key: string): FormControl {
    return (form.get(key) as FormControl) ?? new FormControl();
  }
}
