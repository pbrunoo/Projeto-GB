import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'gb-global-modal',
  templateUrl: './global-modal.component.html',
  styleUrls: ['./global-modal.component.scss']
})

export class ModalGlobalComponent implements OnInit {
  
  public typeModalTitle: string = 'Salvar ticket?';
  public messageModalBody: string = 'Após a confirmação o ticket será emitido e as respostas não poderão ser excluídas.';
  public dataModal: any | undefined;

  @ViewChild('content', {static: true}) content!: HTMLElement;
  @Output() actionData = new EventEmitter<any>();
  @Input() modalType: string | any;
  

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  ngOnInit(): void {
  }

  open(type: string, data?: any) {
    this.dataModal = data;
    this.modalType = type;
    this.typeModalFunction(type);
		this.modalService.open(this.content,{ centered: true });
	}

  typeModalFunction(type: string) {
    switch (type) {
      case 'ticket':
        this.messageModalBody = 'Após a confirmação o ticket será emitido e as respostas não poderão ser excluídas.';
        break;
        case 'delete-ticket':
          this.typeModalTitle = 'Deseja excluir o ticket?';
          this.messageModalBody = 'Após exclusão os dados não poderão ser recuperados.';
          break;
        case 'delete-tag':
          this.typeModalTitle = 'Deseja excluir a Tag?';
          this.messageModalBody = 'Após exclusão os dados não poderão ser recuperados. Tags utilizada em contatos continuarão registradas, porém  não poderão ser mais selecionadas em novos.';
          break;               
    }
  }

  salvar(asa: any){
    this.actionData.emit();
  }

  emitterDelete(){
    let dataEmit = {
      data: [this.dataModal]
    }
    this.actionData.emit(dataEmit);
  }

}
