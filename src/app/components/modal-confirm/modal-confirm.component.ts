import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as Util from 'src/app/shared/util-common';

@Component({
  selector: 'gb-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalConfirmComponent implements OnInit {
  public typeConfirm: string = 'Salvar ticket?';
  public messageConfirm: string = 'Após a confirmação o ticket será emitido e as respostas não poderão ser excluídas.';
  public buttonName = 'Salvar';

  @ViewChild('content', {static: true}) content!: HTMLElement;
  @Output() actionData = new EventEmitter<any>();


  constructor(config: NgbModalConfig, private modalService: NgbModal) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  ngOnInit(): void {
  }

  open(type: string, data?: any) {
    this.typeExclusionFunction(type);
		this.modalService.open(this.content,{ centered: true });
	}

  typeExclusionFunction(type: string) {
    switch (type) {
      case 'ticket':
        this.buttonName = 'Salvar';
        this.messageConfirm = 'Após a confirmação o ticket será emitido e as respostas não poderão ser excluídas.';
        break;
      case 'logout':
        this.buttonName = 'Logout';
        this.typeConfirm = 'Deseja sair do sistema?';
        this.messageConfirm = '';
        break;
    }
  }

  salvar(asa: any){
    if(this.buttonName === 'Logout') {
      Util.logout();

      return;
    }

    this.actionData.emit();
    this.closeModal();
  }

  closeModal() {
    this.modalService.dismissAll('Close click');
  }
}
