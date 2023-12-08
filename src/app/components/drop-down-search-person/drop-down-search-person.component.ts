import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { searchPerson } from 'src/app/core/model/dropdow-searchperson/dropdown-search-person.model';

@Component({
  selector: 'gb-drop-down-search-person',
  templateUrl: './drop-down-search-person.component.html',
  styleUrls: ['./drop-down-search-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownSearchPersonComponent implements OnInit {

  @Input() set name(valor: string) {
    this._name = valor;
  }

  @Input() showSearchField: boolean = true;
  @Input() dropDownBackGroundFace: string = '';
  
  @Input() nameIcon: string = 'icon-building'; //Use name icon like class in assests/demo.html

  @Input() dataPerson: searchPerson[] = [{
    id: 0,
    name: "Carregue os dados",
    email: "",
    phone: "",
    companyId: 0,
    selected: true
  }];

  @Output() outDropDownDataPerson = new EventEmitter<any>();

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
    if(this.dataPerson){
      this.dataPerson[index].selected = true;

      this.dataPerson.forEach((e, i) => {
        if(this.dataPerson[i] !== this.dataPerson[index]){
          e.selected = false;
        }
      })

      this.isCollapsed = !this.isCollapsed;

      let selectedPerson = this.dataPerson.filter(e => e.selected);
      this.outDropDownDataPerson.emit(selectedPerson);
    }
  }

  verifyOutSideClick(evt: any){
    if (evt.ots) this.isCollapsed = true;
  }

}
