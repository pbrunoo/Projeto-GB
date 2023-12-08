import { ModalCategoryComponent } from './../modal-category/modal-category.component';
import { ModalTeamsComponent } from './../modal-teams/modal-teams.component';
import { ModalUserComponent } from './../modal-user/modal-user.component';
import { ModalContactComponent } from './../modal-contact/modal-contact.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCompanyComponent } from './../modal-company/modal-company.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalImportContactComponent } from '../modal-import-contacts/modal-import-contact.component';
import { ModalmodalQuickAnswersComponent } from '../modal-quick-answers/modal-quick-answers.component';

@Component({
  selector: 'gb-headers-page',
  templateUrl: './headers-page.component.html',
  styleUrls: ['./headers-page.component.scss']
})
export class HeadersPageComponent implements OnInit {

  public requestContact: any;
  public textElements: string = '';
  public getNameButtonAdicionar: string = '';
  public searchTerm: string = '';

  @Input() typeModelHeaders!: any;
  @Output() emitterSearch: EventEmitter<string> = new EventEmitter();

  @ViewChild(ModalCompanyComponent) showModalCompany!: ModalCompanyComponent;
  @ViewChild(ModalImportContactComponent) showModalImportContact!: ModalImportContactComponent;
  @ViewChild(ModalUserComponent) showModalUser!: ModalUserComponent;
  @ViewChild(ModalContactComponent) showModalContact!: ModalContactComponent;
  @ViewChild(ModalTeamsComponent) showModalTeams!: ModalTeamsComponent;
  @ViewChild(ModalCategoryComponent) showModalCategory!: ModalCategoryComponent;
  @ViewChild(ModalmodalQuickAnswersComponent) showModalQuickAnswers!: ModalmodalQuickAnswersComponent;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    switch (this.typeModelHeaders) {
      case 'company':
        this.textElements = 'Empresas';
        this.getNameButtonAdicionar = 'empresa';
        break;
      case 'Contatos':
        this.textElements = 'Contatos';
        this.getNameButtonAdicionar = 'contato';
        break;
      case 'Usuarios':
        this.textElements = 'Agentes';
        this.getNameButtonAdicionar = 'usuario';
        break;
      case 'NumberWhatsApp':
        this.textElements = 'Números WhatsApp'
        this.getNameButtonAdicionar = 'numero-whatsapp'
        break;
      case 'Equipes':
        this.textElements = 'Equipes'
        this.getNameButtonAdicionar = 'equipes'
        break;
      case 'Categoria':
        this.textElements = 'Categoria'
        this.getNameButtonAdicionar = 'Categoria'
        break;
      case 'respostas rapidas':
        this.textElements = 'Respostas rápidas'
        this.getNameButtonAdicionar = 'Respostas rápidas'
        break;

    }
}

  register(event: string) {
    switch (this.typeModelHeaders) {
      case 'company':
        this.textElements = 'Empresas';
        this.showModalCompany.openXl(event);
        break;
      case 'Contatos':
        this.textElements = 'Contatos';
        this.showModalContact.open(event);
        break;
      case 'Usuarios':
        this.textElements = 'Agentes';
        this.showModalUser.open(event);
        break;
      case 'Equipes':
        this.textElements = 'Equipes';
        this.showModalTeams.open(event);
        break;
      case 'Categoria':
        this.textElements = 'Categoria';
        this.showModalCategory.open(event);
        break;
      case 'ImportContact':
        this.textElements = 'Importar contatos';
        this.showModalImportContact.open(event);
        break;        
      case 'respostas rapidas':
        this.textElements = 'Respostas rápidas';
        this.showModalQuickAnswers.open(event);
        break;
    }
  }

  openImportContactModal(){
    this.showModalImportContact.open()
  }

  sendEmitter() {
    this.emitterSearch.emit(this.searchTerm);
  }
}
