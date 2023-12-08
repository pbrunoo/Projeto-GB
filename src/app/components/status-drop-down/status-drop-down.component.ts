import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gb-status-drop-down',
  templateUrl: './status-drop-down.component.html',
  styleUrls: ['./status-drop-down.component.scss']
  
})
export class StatusDropDownComponent implements OnInit {
  
  @Output() outDropDownData = new EventEmitter<any>();

  // Selecionada o status enviado do pai
  @Input() set selectItem(ind : number) {

    this.dataDropDown.forEach((el:any, i: number)=> {
      this.dataDropDown[i].selected = false;

      if(ind === 1){
        this.dataDropDown[1].selected = true;
      }
  
      if(ind === 2){
        this.dataDropDown[3].selected = true;
      }
  
      if(ind === 3){
        this.dataDropDown[2].selected = true;
      }
  
      if(ind === 4){
        this.dataDropDown[4].selected = true;
      }
    });   

    setTimeout(() => {
      this.outDropDownData.emit(this.dataDropDown.filter((e: any) => e.selected));
    }, 1000);
  }

  @Input() noArrow: boolean = false;

  @Input() iconBall = false;
  @Input() contentColor = 1;
  @Input() dataDropDown: any = [
    {
      option: 'Selecione...',
      class: 'initial',
      selected: true,
    },
    {
      option: 'Aberto',
      class: 'aberto',
      selected: false,
    },
    {
      option: 'Pendente',
      class: 'pendente',
      selected: false,
    },
    {
      option: 'Resolvido',
      class: 'resolvido',
      selected: false,
    },
    {
      option: 'Excluído',
      class: 'excluido',
      selected: false,
    }
  ];

  isCollapsed: boolean = true;

  /* dataDropDown = [
    {
      option: 'Aberto',
      class: 'aberto',
      selected: false,
    },
    {
      option: 'Pendente',
      class: 'pendente',
      selected: false,
    },
    {
      option: 'Resolvido',
      class: 'resolvido',
      selected: true,
    }
  ]; */

  constructor() { }

  ngOnInit(): void {
  }

  openCloseDropDown(){
    this.isCollapsed = !this.isCollapsed;
  }

  returnSelected(options: any){
    return options.find((e:any) => e.selected) || {
      option: 'Carregue seus dados',
      class: '',
      selected: false,
    }
  }

  selectOption(index: number){
    if(this.dataDropDown.length > 0){
      this.dataDropDown[index].selected = true;

      this.dataDropDown.forEach((e: any, i: number) => {
        if(this.dataDropDown[i] !== this.dataDropDown[index]){
          e.selected = false;
        }
      })  
      
      this.isCollapsed = !this.isCollapsed;
  
      this.outDropDownData.emit(this.dataDropDown.filter((e: any) => e.selected));
    }
  }

  verifyOutSideClick(evt: any){
    if (evt.ots) this.isCollapsed = true;
  }

  removeInitialValue(val: any){
    return val.filter((e: any) => e.class !== 'initial');
  }
}
