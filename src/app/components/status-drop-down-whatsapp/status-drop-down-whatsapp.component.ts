import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gb-status-drop-down-whatsapp',
  templateUrl: './status-drop-down-whatsapp.component.html',
  styleUrls: ['./status-drop-down-whatsapp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StatusDropDownWhatsappComponent implements OnInit {

  @Input() iconBall = false;
  @Input() contentColor = 1;
  @Input() dataDropDown: any = [
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
  ];

  @Output() outDropDownData = new EventEmitter<any>();

  isCollapsed: boolean = true;

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
}
