import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'gb-global-header-into',
  templateUrl: './global-header-into.component.html',
  styleUrls: ['./global-header-into.component.scss']
})
export class GlobalHeaderIntoComponent implements OnInit {
  @Input() title: string = 'Tags';
  @Input() titleButton: string = 'Adicionar tag';
  @Input() iconButton: any =  {button: true, icon: true, classIcon: 'icon-add'};
  @Output() eventclick: any = new EventEmitter<any>()


  constructor() { }

  ngOnInit(): void {
  }

  emitEventClick(){
    this.eventclick.emit()
  }

}
