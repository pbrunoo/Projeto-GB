import { Component, OnInit, ViewChild } from '@angular/core';
import * as Util from 'src/app/shared/util-common';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'gb-sidemenu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;

  constructor() {}

  ngOnInit(): void {}

  clearTabs() {
   Util.clearTabs();
  }

  whatsappSelect() {
    let data: any = {
      message: 'Este módulo está em manutenção, estamos criando um sistema de equipes para melhor atendimento!',
      type: 'error'
    }

    this.toast.showToast(data);
  }


}
