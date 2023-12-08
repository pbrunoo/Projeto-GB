import { Subject } from 'rxjs';
import { NumberWhatsappInterface } from './../../core/model/number-whatsapp/number-whatsapp.model';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { searchPerson } from 'src/app/core/model/dropdow-searchperson/dropdown-search-person.model';

@Component({
  selector: 'gb-drop-down-contact-whatsapp',
  templateUrl: './drop-down-contact-whatsapp.component.html',
  styleUrls: ['./drop-down-contact-whatsapp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownContactWhatsapp implements OnInit {

  hearNumberWhatsappArrive = new Subject<any>();
  @Input() set name(valor: string) {
    this._name = valor;
  }

  @Input()  set dataNumberWhatsapGroup(val: any){
    this.dataWhatsappNumber = val;

    this.hearNumberWhatsappArrive.next(val);
  }

  dataWhatsappNumber: any = [{
    id: 0,
    name: "Carregue os dados",
    phoneNumber: "",
    companyId: 0,
    selected: true
  }];

  @Input() set selectCompanyWhatsappCompany(index: any){

    this.hearNumberWhatsappArrive.subscribe(dt => {

        this.dataWhatsappNumber.forEach((e: any) => {
          e.selected = false;

          if(e.id === index){
            e.selected = true
          }
        })
    })
  }

  @Output() outDropDowndataWhatsappNumber = new EventEmitter<any>();

  _name: string = '';
  searchTerm: string = '';

  isCollapsed: boolean = true;

  constructor() {}

  ngOnInit(): void {
  }

  openCloseDropDown(){
    this.isCollapsed = !this.isCollapsed;
  }

  selectOption(index: number){
    if(this.dataWhatsappNumber){
      this.dataWhatsappNumber[index].selected = true;

      this.dataWhatsappNumber.forEach((e: any, i: any) => {
        if(this.dataWhatsappNumber[i] !== this.dataWhatsappNumber[index]){
          e.selected = false;
        }
      })

      this.isCollapsed = !this.isCollapsed;

      let selectedPerson = this.dataWhatsappNumber.filter((e: any) => e.selected);
      this.outDropDowndataWhatsappNumber.emit(selectedPerson);
    }
  }

  verifyOutSideClick(evt: any){
    if (evt.ots) this.isCollapsed = true;
  }

  selectNameNumberWhatsapp(){
    let NumberWhatsappName = this.dataWhatsappNumber.filter((e: any) => e.selected).length > 0 ? this.dataWhatsappNumber.filter((e: any) => e.selected)[0].name : null;
    if(NumberWhatsappName) return { title: NumberWhatsappName, selected: true};

    return { title: 'Selecione um responsável', selected: false};
  }
}
