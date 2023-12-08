import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { forkJoin, isEmpty, Observable, of, Subject, switchMap } from 'rxjs';
import { ModalChatBotScheduleComponent } from '../modal-chatbot-schedule/modal-chatbot-schedule-component';

@Component({
  selector: 'gb-drop-down-teans',
  templateUrl: './drop-down-teans.component.html',
  styleUrls: ['./drop-down-teans.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropDownTeansComponent
    }
  ]
})

export class DropDownTeansComponent implements OnInit, ControlValueAccessor {

  hearUserArrive = new Observable<any>();

  @Input() titleIcon: string = ''; // set values: user, contacts or '';
  @Input() listIcon: string = ''; // set values: user, contacts or '';
  @Input() labelField: string = 'Selecionar uma ou mais equipes';

  @Input() set names(valor: string) {
    this._name = valor;
  }

  @Input() set dataTeans(val: any) {
    this.dataTeansArrive = val;

    this.hearUserArrive = new Observable<any>(e => e.next(val));
  }

  dataTeansArrive = [{
    id: 0,
    name: '',
    color: "",
    status: "",
    messageWhatsappId: "Luan Fernando",
    select: true,
    selected: true
  }];

  @Input() set selectTeans(index: Observable<number>) {

    index.pipe(switchMap((arr: any) => {
      this.hearUserArrive.subscribe(aa => {

        this.dataTeansArrive.forEach(e => {
          e.selected = false;
          if (e.id === arr) {
            e.selected = true
          }
        })

        let selectedPerson = this.dataTeansArrive.filter(e => e.selected);
        this.outDropDownDataTeans.emit(selectedPerson);
      })

      const obs$ = this.hearUserArrive

      return forkJoin([obs$]);
    })).subscribe(r => r)
  }

  @Output() outDropDownDataTeans = new EventEmitter<any>();

  _name: string = '';
  searchTerm: string = '';

  isCollapsed: boolean = true;

  // VARIAVEIS PARA O ACCESSOR
  onChange = (select: any) => { };
  onTouched = () => { };
  touched: boolean = false;
  select: any;
  @Input() controlDisable: boolean = false;

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

    this.dataTeansArrive.forEach((e) => {
      e.selected = false;
    })
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

 @Input()  setDisabledState?(isDisabled: boolean): void {
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
    this.dataTeansArrive[index].selected = true;

    // Envia ao forumlário pai;
    this.onChange(this.dataTeansArrive[index]);

    this.dataTeansArrive.forEach((e, i) => {
      if (this.dataTeansArrive[i] !== this.dataTeansArrive[index]) {
        e.selected = false;
      }
    })

    this.isCollapsed = !this.isCollapsed;

    let selectedPerson = this.dataTeansArrive.filter(e => e.selected);

    this.outDropDownDataTeans.emit(selectedPerson);
    this.selectNamePerson();
  }

  verifyOutSideClick(evt: any) {
    if (evt.ots) this.isCollapsed = true;
  }

  selectNamePerson() {
    let personName = this.dataTeansArrive.filter(e => e.selected).length > 0 ? this.dataTeansArrive.filter(e => e.selected)[0].name : null;
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
