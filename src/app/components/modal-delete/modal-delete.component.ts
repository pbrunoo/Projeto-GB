import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'gb-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  public identificationExclusion!: string;
  public typeExclusion: string = '';
  public messageExclusion: string = 'Após exclusão os dados não poderão ser recuperados.';

  @ViewChild('content', {static: true}) content!: HTMLElement;
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() emitOtherData: EventEmitter<string> = new EventEmitter();

  _data: any;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  ngOnInit(): void {
  }

  open(type: string, data?: any) {
    if(typeof data !== undefined) this._data = data;
    this.typeExclusionFunction(type);
		this.modalService.open(this.content,{ centered: true });
	}

  typeExclusionFunction(type: string) {
    this.identificationExclusion = type;
    switch (type) {
      case 'company':
        this.typeExclusion = 'Deseja excluir empresa?';
        break;
      case 'contact':
        this.typeExclusion = 'Deseja excluir contato?';
        break;
      case 'company contact':
        this.typeExclusion = 'Deseja excluir contato?';
        break;
      case 'user':
        this.typeExclusion = 'Deseja excluir o ticket?';
        this.messageExclusion = 'Após exclusão os dados não poderão ser recuperados.';
        break;
      case 'message-scheduler':
        this.typeExclusion = 'Deseja excluir agendamento?';
        this.messageExclusion = 'Após exclusão os dados não poderão ser recuperados.';
        break;
      case 'bot-greeting':
        this.typeExclusion = 'Deseja excluir a mensagem?';
        this.messageExclusion = 'Após exclusão os dados não poderão ser recuperados.';
        break;
      case 'bot-model-message':
        this.typeExclusion = 'Deseja excluir o modelo?';
        this.messageExclusion = 'Após exclusão os dados não poderão ser recuperados.';
        break;
      case 'teams':
        this.typeExclusion = 'Deseja excluir a equipe?';
        this.messageExclusion = 'Após exclusão os dados não poderão ser recuperados.';
        break;
      case 'category':
        this.typeExclusion = 'Deseja excluir a categoria?';
        this.messageExclusion = 'Após exclusão os dados não poderão ser recuperados.';
        break;
      case 'quickAnswers':
        this.typeExclusion = 'Deseja excluir a resposta?';
        this.messageExclusion = 'Após exclusão os dados não poderão ser recuperados.';
        break;
    }
  }

  emitterDelete() {
    this.delete.emit(this.identificationExclusion);
    if(typeof this._data !== undefined) this.emitOtherData.emit(this._data);
    this.modalService.dismissAll('Close click');
  }
}
