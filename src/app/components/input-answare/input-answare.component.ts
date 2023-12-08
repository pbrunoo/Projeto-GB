import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface IInputAnswareData {
  text: string;
  private: boolean;
  attachment: string[];
}

@Component({
  selector: 'gb-input-answare',
  templateUrl: './input-answare.component.html',
  styleUrls: ['./input-answare.component.scss'],
})
export class InputAnswareComponent {
  private _formgroup: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    private: new FormControl(false),
    attachment: new FormControl([]),
  });
  private _ticket?: number;

  activeTab: number = 0;

  @Input() set ticketId(value: number) {
    this._ticket = value;
  }
  get ticketId() {
    return this._ticket ?? 0;
  }

  @Input() set formgroup(value: FormGroup | AbstractControl) {
    this._formgroup = value as FormGroup;
  }
  get formgroup(): FormGroup {
    return this._formgroup as FormGroup;
  }

  @Output() saveEvent: EventEmitter<IInputAnswareData> = new EventEmitter();

  get isIndependent() {
    return !!this.ticketId;
  }

  constructor() {}

  newFile(url: string) {
    const value = this.formgroup.get('attachment')?.value ?? [];
    value.push(url);

    this.formgroup.get('attachment')?.setValue(value);
  }

  removeFile(index: number) {
    const value = this.formgroup.get('attachment')?.value ?? [];
    value.splice(index, 1);

    this.formgroup.get('attachment')?.setValue(value);
  }

  setTab(i: number) {
    this.activeTab = i;
    if (i === 0) {
      this.formgroup.get('private')?.setValue(false);
    } else {
      this.formgroup.get('private')?.setValue(true);
    }
  }

  save(e: any) {
    if (e) e.preventDefault();
    console.log(this.formgroup);
    if (this.formgroup.invalid && !this.isIndependent) return;

    this.saveEvent.emit(this.formgroup.value);
  }
}
