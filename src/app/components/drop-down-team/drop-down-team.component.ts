import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeansInterface } from 'src/app/core/model/teans/teans.interface';

@Component({
  selector: 'gb-drop-down-team',
  templateUrl: './drop-down-team.component.html',
  styleUrls: ['./drop-down-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class DropDownTeamComponent implements OnInit {

  @Input() listData: any[] = [{
    id: 0,
    name: 'Teste',
    color: '',
    status: '',
    messageWhatsappId: ''
  }];

  @Input() title: string = 'Todas equipes';
  @Output() selectedItem = new EventEmitter<any>();

  controlArrow: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  markSelectedItem(i: number): void{
    this.listData[i].selected = true;

    this.listData.forEach((e, j: number) => {
      if(this.listData[j] !== this.listData[i]){
        e.selected = false;
      }      
    })

    this.selectedItem.emit(this.listData[i]);
    this.toggleArrow();
  }

  toggleArrow(): void{
    this.controlArrow = !this.controlArrow;
  }

  resolveTitle(): string{
    let titles: string = '';

    this.listData?.forEach((e: any, i: number) => {
      if(this.listData[i].selected){
        titles = e.name;
      }      
    })

    return titles ? titles : 'Todos as equipes';
  }

  verifyOutSideClick(evt: any){
    if (evt.ots) this.controlArrow = false;
  }

}
