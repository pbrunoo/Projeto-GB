import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'gb-drop-down-greeting',
  templateUrl: './drop-down-greeting.component.html',
  styleUrls: ['./drop-down-greeting.component.scss'],

})
export class DropDownGreetingComponent implements OnInit {
  hearContactArrive = new Subject<any>();
  @Input() set name(valor: string) {
    this._name = valor;
  }

  @Input() disabledDrop!: boolean;

  @Input() set dataBotGreetingGroup(val: any){
    this.dataBotGreeting = val;

    this.hearContactArrive.next(val);
  }

  dataBotGreeting: any[] = [{
    id: 0,
    name: '',
    type: '',
    message: '',
    companyId: 0,
    selected: true,
  }];

  @Input() set selectBotGreeting(index: any){
    this.hearContactArrive.subscribe(dt => {

        this.dataBotGreeting.forEach(e => {
          e.selected = false;

          if(e.id === index){
            e.selected = true
          }
        })
    })
  }

  @Output() outDropDownDataBotGreeting = new EventEmitter<any>();

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
    if(this.dataBotGreeting){
      this.dataBotGreeting[index].selected = true;

      this.dataBotGreeting.forEach((e, i) => {
        if(this.dataBotGreeting[i] !== this.dataBotGreeting[index]){
          e.selected = false;
        }
      })

      this.isCollapsed = !this.isCollapsed;

      let selectedBotsGreeting = this.dataBotGreeting.filter(e => e.selected);
      this.outDropDownDataBotGreeting.emit(selectedBotsGreeting);

    }
  }

  verifyOutSideClick(evt: any){
    if (evt.ots) this.isCollapsed = true;
  }

  selectNameBotGreeting(){
    let botGreetingName = this.dataBotGreeting.filter(e => e.selected).length > 0 ? this.dataBotGreeting.filter(e => e.selected)[0].message : null;
    if(botGreetingName) return { message: botGreetingName, selected: true};

    return { message: 'Selecione um responsável', selected: false};
  }

}
