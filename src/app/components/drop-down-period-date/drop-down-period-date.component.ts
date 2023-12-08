import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'gb-drop-down-period-date',
  templateUrl: './drop-down-period-date.component.html',
  styleUrls: ['./drop-down-period-date.component.scss'],
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
export class DropDownPeriodDateComponent implements OnInit {

  @Output() selectedData = new EventEmitter<any>();

  tagDate: any = [{
    title: 'Hoje',
    date: '2023-02-01',
    selected: false
  },
  {
    title: 'Últimos 15 dias',
    date: '2023-02-01',
    selected: false
  },
  {
    title: 'Últimos 30 dias',
    date: '2023-02-01',
    selected: false
  },{
    title: 'Mês atual',
    date: '2023-02-01',
    selected: false
  }];
  public dateStart: NgbDateStruct = { year: 0, month: 0, day: 0 };
  public dateEnd: NgbDateStruct = { year: 0, month: 0, day: 0 };

  dateToday: any = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(',');
  dateChoose: string | any;
  dateLast30Days: string | any;
  dateCurrentMonth: string | any;
  toggleSelect: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleOpenClose(){
    this.toggleSelect = !this.toggleSelect;
  }

  selectTag(i: number){

    // Se já tiver selecionado tira a seleção e limpa as varáveis
    for(let l = 0; l < this.tagDate.length; l++){
      if(this.tagDate[l] === this.tagDate[i] && this.tagDate[i].selected){
        this.tagDate[i].selected = false;
        this.clearAllDates();
        return;
      }
    }

    this.tagDate[i].selected = true;

    this.tagDate.forEach((el: any, j: number) => {
      if(this.tagDate[j] !== this.tagDate[i]){
        el.selected = false;
      }      
    });

    // Tag selecionada fields sem valor (caso os fields estejam preeenchidos)!
    this.dateEnd = { year: 0, month: 0, day: 0 };
    this.dateStart = { year: 0, month: 0, day: 0 };

    if(this.tagDate[0].selected){
      this.dateChoose = null;
    }

    if(this.tagDate[1].selected){
      this.dateChoose = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 15).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(',');
    }

    if(this.tagDate[2].selected){
      this.dateChoose = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 30).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(',');
    }

    if(this.tagDate[3].selected){
      this.dateChoose = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(',');
    }
  }

  disableButton(): boolean{

    let tags = this.tagDate.some((r: any) => r.selected);
    let dates = this.dateStart.year !== 0 && this.dateEnd.year !== 0 ? true : false;

    if(tags || dates) return false;

    return true;
  }

  disableDatesStartEnd(): boolean{

    let tags = this.tagDate.some((r: any) => r.selected);

    if(tags) return true;

    return false;
  }

  clearAllDates(){
    this.dateChoose = null;
    this.dateEnd = { year: 0, month: 0, day: 0 };
    this.dateStart = { year: 0, month: 0, day: 0 };

    this.tagDate.forEach((el: any) => {
        el.selected = false;
    });

    this.toggleOpenClose();

    let sendDate = {
      today: null,
      dateChoose: null,
      dateStart: null,
      dateEnd: null,
      control: 'clear'
    }
    this.selectedData.emit(sendDate);
  }

  applyFilterDate(){
    let sendDate = {
      today: this.dateToday,
      dateChoose: this.dateChoose ? this.dateChoose : null,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      control: 'filter'
    }

    this.selectedData.emit(sendDate);

    this.toggleOpenClose();
  }

  formatCaption(){
    let resultDate;

    if(this.dateChoose && (this.dateStart.year === 0 && this.dateEnd.year === 0)){
      resultDate = `Pers. ${this.dateChoose[0].slice(0, 5)} - ${this.dateToday[0]}`;
    }

    if(!this.dateChoose && (this.dateStart.year !== 0 && this.dateEnd.year !== 0)){
      let dateStart = new Date(this.dateStart.year, this.dateStart.month - 1, this.dateStart.day).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(',')[0];
      let dateEnd = new Date(this.dateEnd.year, this.dateEnd.month - 1, this.dateEnd.day).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(',')[0];

      resultDate = `Pers. ${dateStart.slice(0, 5)} - ${dateEnd}`;      
    }

    if(!this.dateChoose && (this.dateStart.year === 0 && this.dateEnd.year === 0)){
      resultDate = `Hoje ${this.dateToday[0]}`
    }

    return resultDate;

  }

  verifyOutSideClick(evt: any){
    if (evt.ots) this.toggleSelect = false;
  }

}
