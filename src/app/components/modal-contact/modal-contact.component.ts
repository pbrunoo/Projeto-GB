import { CompanyUseCase } from './../../core/usecase/company/company.usecase';
import { Subscription } from 'rxjs';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CreateContactUseCase } from 'src/app/core/usecase/contact/create-contact.usecase';
import { UpdateContactUseCase } from 'src/app/core/usecase/contact/update-contact.usecase';

@Component({
  selector: 'gb-modal-contact',
  templateUrl: './modal-contact.component.html',
  styleUrls: ['./modal-contact.component.scss']
})
export class ModalContactComponent implements OnInit {

  public varSubscriptionCompany!: Subscription;
  public event: string = '';
  public backupContact: any;
  public companyId!: number;
  public dropIsOk: boolean = false;
  public objContact: any = {
      name: '',
      email: '',
      phone: '',
      companyId: 0,
    }

  public idContact!: string;
  public title: string = 'Adicionar';
  public titleButton: string = 'Adicionar';
  public objectCompany: any = [];

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  public contactForm: FormGroup = this.fb.group({
    contactName: ["", [Validators.required ]],
    email: ["", [Validators.email]],
    phone: ["", [Validators.required ]]
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private companyUseCase: CompanyUseCase,
    private createContactUseCase: CreateContactUseCase,
    private updateContactUseCase: UpdateContactUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {

  }

  open(event: string, data?: any) {
    this.isEditContact(data);
    this.event = event;
    this.requestCompany();

    if(this.event === 'Editar') {
      this.title = event;
      this.titleButton = 'Salvar alterações';
    }
    if(this.event !== 'Editar') {
      this.title = 'Adicionar';
      this.titleButton = 'Salvar';
    }

		this.modalService.open(this.content, {
      size: 'lg',
      centered: true
    });
	}

  getSelectedCompany(event: any): void {
    this.companyId = event[0].id;
    this.dropIsOk = true;
  }

  saveRegister() {
    this.getInforForm();
    if(this.event === 'Editar') {
      this.showMessage('Contato alterado com sucesso!', 'success');
      this.updateContactRequest(this.objContact);
      this.modalService.dismissAll('Close click');
      this.clearAll();
      return;
    }
    this.createContactRequest(this.objContact);
    this.showMessage('Contato adicionado com sucesso!', 'success');
    this.modalService.dismissAll('Close click');
    this.clearAll();
  }

  isEditContact(contact: any) {
    if(contact) {
      this.companyId = contact.companyId;
      this.idContact = JSON.parse(contact.id);
      this.backupContact = contact;
      this.objContact = contact;
      this.contactForm.patchValue({
        contactName: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
    }
  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }

  clearContact() {
    if(this.backupContact) {
      this.objContact = this.backupContact;
      return;
    }
    this.objContact = []
  }

  clearAll() {
    this.contactForm.reset();
    this.objContact = [];
    this.backupContact = [];
    this.dropIsOk = false;
  }

  requestCompany() {
    this.unsubscriptionVariable(this.varSubscriptionCompany);
    this.varSubscriptionCompany = this.companyUseCase.execute()
      .subscribe(
        this.successContactResponse,
        this.errorContactResponse
      )
  }

  successContactResponse = (res: any) => {
    this.objectCompany = this.mapContact(res);
  }

  errorContactResponse = (error: any) => {
    this.showMessage(error, 'error');
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  showMessage(message: string, type: string) {
    let data: any = {
      message: message,
      type: type
    }
    this.toast.showToast(data);
  }

  updateContactRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionCompany);
    this.varSubscriptionCompany = this.updateContactUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  createContactRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionCompany);
    this.varSubscriptionCompany = this.createContactUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    window.dispatchEvent(new Event('CONTACT_REFRESH'));
  }

  errorResponse = (error: any) => {
    this.showMessage(`Ocorreu um erro tente novamente mais tarde ${error.statusCode}`, 'error');
  }

  mapContact(value: any) {
    const valueMapped = value.map((rs: any) => {
      return {
      id: rs.id,
      name: rs.name,
      businessName: rs.businessName,
      phone: rs.phone,
      cnpj: rs.cnpj,
      selected: false
      }
    });
    return valueMapped;
  }

  getInforForm() {
    if(this.idContact) {
      this.objContact = {
        id: this.idContact,
        name: this.contactForm.controls['contactName'].value,
        email: this.contactForm.controls['email'].value,
        phone: this.contactForm.controls['phone'].value,
        companyId: this.companyId
      }

      return;
    }

    this.objContact = {
      name: this.contactForm.controls['contactName'].value,
      email: this.contactForm.controls['email'].value,
      phone: this.contactForm.controls['phone'].value,
      companyId: this.companyId
    }
  }

}
