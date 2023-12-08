import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { forkJoin, isEmpty, Observable, of, Subject, switchMap } from 'rxjs';
import { ModalChatBotScheduleComponent } from '../modal-chatbot-schedule/modal-chatbot-schedule-component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'gb-drop-down-group',
  templateUrl: './drop-down-group.component.html',
  styleUrls: ['./drop-down-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropDownGroupComponent
    }
  ],
  animations: [trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 , with: 0 }),
      animate('100ms', style({ opacity: 1, with: 300 })),
    ]),
    transition(':leave', [
      animate( '100ms', style({ opacity: 0, with: 0 })),
    ])
  ])]
})

export class DropDownGroupComponent implements OnInit, ControlValueAccessor {

  hearUserArrive = new Observable<any>();

  @Input() titleIcon: string = ''; // set values: user, contacts or '';
  @Input() listIcon: string = ''; // set values: user, contacts or '';
  @Input() labelField: string = 'Selecione um valor';
  @Input() searchField: boolean = true;
  @Input() dropDownBackGroundFace: string | undefined;

  @Input() set names(valor: string) {
    this._name = valor;
  }

  @Input() set dataPersonGroup(val: any) {
    this.dataPersonGroupArrive = val;

    this.hearUserArrive = new Observable<any>(e => e.next(val));
  }

  dataPersonGroupArrive = [{
    id: 0,
    email: "",
    password: "",
    name: "Luan Fernando",
    type: 1,
    selected: true
  }];

  @Input() set selectUser(index: Observable<number>) {

    index.pipe(switchMap((arr: any) => {
      this.hearUserArrive.subscribe(aa => {

        this.dataPersonGroupArrive.forEach(e => {
          e.selected = false;
          if (e.id === arr) {
            e.selected = true
          }
        })

        let selectedPerson = this.dataPersonGroupArrive.filter(e => e.selected);
        this.outDropDownDataPersonGroup.emit(selectedPerson);
      })

      const obs$ = this.hearUserArrive

      return forkJoin([obs$]);
    })).subscribe(r => r)
  }

  @Input() showSearchField: boolean = true;

  @Input() showIconInList: boolean = true;

  @Output() outDropDownDataPersonGroup = new EventEmitter<any>();

  _name: string = '';
  searchTerm: string = '';

  isCollapsed: boolean = false;

  // VARIAVEIS PARA O ACCESSOR
  onChange = (select: any) => { };
  onTouched = (control?: any) => {};
  touched: boolean = false;
  select: any;
  controlDisable: boolean = false;
  itemSelected: boolean = false;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }


  // METODOS DO ACCESSOR
  writeValue(obj: any): void {

    this.select = obj;



    this.dataPersonGroupArrive.forEach((e) => {
      e.selected = false;
    })
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.controlDisable = isDisabled;
  }

  ngOnInit(): void {
  }

  openCloseDropDown() {
    this.isCollapsed = !this.isCollapsed;
    // Marca se foi tocado para o accessor
    this.markAsTouched();
  }

  selectOptions(index: number) {
    this.dataPersonGroupArrive[index].selected = true;

    // Envia ao forumlário pai;
    this.onChange(this.dataPersonGroupArrive[index]);
    // Marca se foi tocado para o accessor
    this.markAsTouched();

    this.dataPersonGroupArrive.forEach((e, i) => {
      if (this.dataPersonGroupArrive[i] !== this.dataPersonGroupArrive[index]) {
        e.selected = false;
      }
    })

    this.isCollapsed = !this.isCollapsed;

    let selectedPerson = this.dataPersonGroupArrive.filter(e => e.selected);
    this.itemSelected = this.dataPersonGroupArrive.some(e => e.selected);

    this.outDropDownDataPersonGroup.emit(selectedPerson);
    this.selectNamePerson();
  }

  verifyOutSideClick(evt: any) {
    if (evt.ots) this.isCollapsed = false;
  }

  selectNamePerson() {
    let personName = this.dataPersonGroupArrive.filter(e => e.selected).length > 0 ? this.dataPersonGroupArrive.filter(e => e.selected)[0].name : null;
    if (personName) return { title: personName, selected: true };

    return { title: this.labelField, selected: false };
  }


  // Metodos auxiliares para o acessor
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

}
