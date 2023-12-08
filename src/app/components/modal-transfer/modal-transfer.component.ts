import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import * as Util from 'src/app/shared/util-common';
import { GetResponsibleUseCases } from 'src/app/core/usecase/responsible/responsible.usecases';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'gb-modal-transfer',
  templateUrl: './modal-transfer.component.html',
  styleUrls: ['./modal-transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalTransferComponent implements OnInit, OnDestroy  {
  public typeConfirm: string = 'Salvar ticket?';
  public messageConfirm: string = 'Após a confirmação o ticket será emitido e as respostas não poderão ser excluídas.';
  public buttonName = 'Salvar';

  @ViewChild('content', {static: true}) content!: HTMLElement;
  @Output() actionData = new EventEmitter<any>();
  private readonly resposibleSubject: Subject<boolean> = new Subject();
  responsData: any = [];
  transferir: any = [];


  constructor(config: NgbModalConfig, 
    private modalService: NgbModal, 
    private getResponsibles: GetResponsibleUseCases) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  ngOnInit(): void {
    this.getResponsiblesAll();
  }

  ngOnDestroy(): void {
    this.resposibleSubject.next(true);
    this.resposibleSubject.unsubscribe();
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
  }

  selectedUser(evt: any){
    this.transferir.push(evt[0])
  }

  getResponsiblesAll(){
    this.getResponsibles.execute()
      .pipe(takeUntil(this.resposibleSubject)).subscribe(e => {
      this.responsData = e;
    })
  }
}
