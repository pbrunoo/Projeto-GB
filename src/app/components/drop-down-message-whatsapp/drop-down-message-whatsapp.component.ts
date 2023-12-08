import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'gb-drop-down-message-whatsapp',
  templateUrl: './drop-down-message-whatsapp.component.html',
  styleUrls: ['./drop-down-message-whatsapp.component.scss'],

})
export class DropDownMessageWhatsappComponent implements OnInit {
  hearContactArrive = new Subject<any>();
  @Input() set name(valor: string) {
    this._name = valor;
  }

  @Input() disabledDrop!: boolean;

  @Input() set dataMessageWhatsappGroup(val: any){
    this.dataMessageWhatsapp = val;

    this.hearContactArrive.next(val);
  }

  dataMessageWhatsapp: any[] = [{
    id: 0,
    name: '',
    type: '',
    message: '',
    companyId: 0,
    selected: true,
  }];

  @Input() set selectMessageWhatsapp(index: any){
    this.hearContactArrive.subscribe(dt => {

        this.dataMessageWhatsapp.forEach(e => {
          e.selected = false;
          if(e.id === index){
            e.selected = true;
          }
        })
    })
  }

  @Output() outDropDownDataMessageWhatsapp = new EventEmitter<any>();

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
    if(this.dataMessageWhatsapp){
      this.dataMessageWhatsapp[index].selected = true;

      this.dataMessageWhatsapp.forEach((e, i) => {
        if(this.dataMessageWhatsapp[i] !== this.dataMessageWhatsapp[index]){
          e.selected = false;
        }
      })

      this.isCollapsed = !this.isCollapsed;

      let selectedMessagesWhatsapp = this.dataMessageWhatsapp.filter(e => e.selected);
      this.outDropDownDataMessageWhatsapp.emit(selectedMessagesWhatsapp);

    }
  }

  verifyOutSideClick(evt: any){
    if (evt.ots) this.isCollapsed = true;
  }

  selectNameMessageWhatsapp(){
    let MessageWhatsappName = this.dataMessageWhatsapp.filter(e => e.selected).length > 0 ? this.dataMessageWhatsapp.filter(e => e.selected)[0].name : null;
    if(MessageWhatsappName) return { name: MessageWhatsappName, selected: true};

    return { name: 'Selecionar chatbot', selected: false};
  }

}
