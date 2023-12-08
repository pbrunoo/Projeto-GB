import { Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { searchPerson } from 'src/app/core/model/dropdow-searchperson/dropdown-search-person.model';

@Component({
  selector: 'gb-drop-down-contact-company',
  templateUrl: './drop-down-contact-company.component.html',
  styleUrls: ['./drop-down-contact-company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownContactCompany implements OnInit {

  hearContactArrive = new Subject<any>();
  @Input() set name(valor: string) {
    this._name = valor;
  }

  @Input() set dataCompanyGroup(val: any){
    this.dataCompany = val;

    this.hearContactArrive.next(val);
  }

  dataCompany: any[] = [{
    id: 0,
    name: "Carregue os dados",
    businessName: "",
    cnpj: "",
    email: "",
    phone: "",
    selected: true
  }];

  @Input() set selectCompany(index: any){

    this.hearContactArrive.subscribe(dt => {

        this.dataCompany.forEach(e => {
          e.selected = false;

          if(e.id === index){
            e.selected = true
          }
        })
    })
  }

  @Output() outDropDownDataCompany = new EventEmitter<any>();

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
    if(this.dataCompany){
      this.dataCompany[index].selected = true;

      this.dataCompany.forEach((e, i) => {
        if(this.dataCompany[i] !== this.dataCompany[index]){
          e.selected = false;
        }
      })

      this.isCollapsed = !this.isCollapsed;

      let selectedCompany = this.dataCompany.filter(e => e.selected);
      this.outDropDownDataCompany.emit(selectedCompany);

    }
  }

  verifyOutSideClick(evt: any){
    if (evt.ots) this.isCollapsed = true;
  }

  selectNameCompany(){
    let companyName = this.dataCompany.filter(e => e.selected).length > 0 ? this.dataCompany.filter(e => e.selected)[0].name : null;
    if(companyName) return { title: companyName, selected: true};

    return { title: 'Selecione um responsável', selected: false};
  }

}
