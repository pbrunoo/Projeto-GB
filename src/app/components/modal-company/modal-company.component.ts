import { UpdateCompanyUseCase } from './../../core/usecase/company/update-company.usecase';
import { CreateCompanyUseCase } from './../../core/usecase/company/create-company.usecase';
import { CompanyInterface } from './../../core/model/company/company.interface';
import { ContactUseCase } from './../../core/usecase/contact/contact.usecase';
import { Subscription } from 'rxjs';
import { ToastMessageComponent } from './../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gb-modal-company',
  templateUrl: './modal-company.component.html',
  styleUrls: ['./modal-company.component.scss']
})
export class ModalCompanyComponent implements OnInit {

  public objectCompany!: CompanyInterface;
  public idCompany!: string;
  public event: string = '';
  public backupContact: any;
  public objContact: any = [];
  public objContactId: any = [];
  public title: string = 'Adicionar';
  public titleButton: string = 'Salvar';
  public varSubscriptionCompany!: Subscription
  public requestContact!: any;
  public mapRequestContact!: any;

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  @Input() getContacts!: any;

  public companyForm: FormGroup = this.fb.group({
    companyName: ["", [Validators.required ]],
    fantasyName: [""],
    cnpj: ["", [Validators.required ]],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required]]
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private contactUseCase: ContactUseCase,
    private createCompanyUseCase: CreateCompanyUseCase,
    private updateCompanyUseCase: UpdateCompanyUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {

  }

  openXl(event: string, data?: any) {
    this.isEditCompany(data);
    this.event = event;

    this.requestContacts();
    if(this.event === 'Editar') {
      this.title = event;
      this.titleButton = 'Salvar alterações';
    }
    if(this.event !== 'Editar') {
      this.title = 'Adicionar';
      this.titleButton = 'Salvar';
    }

		this.modalService.open(this.content, {
      size: 'xl',
      centered: true
    });
	}

  getSelectedPerson(event: any): void {
    this.objContact.push(event[0]);
    const mapId = this.objContact.map((contact: any) =>  {
      return {'id': contact.id}
    });
    this.objContactId = mapId;

  }

  saveRegister() {
    this.getInforForm();
    if( this.event === 'Editar') {
      this.showMessage('Empresa alterada com sucesso!', 'success');
      this.updateCompanyRequest(this.objectCompany);
      this.modalService.dismissAll('Close click');
      this.clearAll();
      return;
    }

    this.showMessage('Empresa adicionada com sucesso!', 'success');
    this.createCompanyRequest(this.objectCompany);
    this.modalService.dismissAll('Close click');
    this.clearAll();
  }

  deleteContact(id: number, index: number) {
    this.objContact.splice(index, 1);
    this.objContactId.splice(index, 1);
  }

  isEditCompany(company: any) {
    if(company) {
      this.idCompany = company.id;
      this.backupContact = company.contacts;
      this.objContact = company.contacts;
      const mapId = company.contacts.map((contact: any) =>  {
        return {'id': contact.id}
      });
      this.objContactId = mapId;
      this.companyForm.patchValue({
        companyName: company.name,
        fantasyName: company.businessName,
        cnpj: company.cnpj,
        email: company.email,
        phone: company.phone
      });
    }
  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }

  clearAll() {
    this.companyForm.reset();
    this.objContact = [];
    this.objContactId = [];
    this.backupContact = [];
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  requestContacts() {
    this.unsubscriptionVariable(this.varSubscriptionCompany);
    this.contactUseCase.execute()
      .subscribe(
        this.successContactResponse,
        this.errorContactResponse
      )
  }

  successContactResponse = (res: any) => {
    this.requestContact = this.mapContact(res);
  }

  errorContactResponse = (error: any) => {
    this.showMessage(error, 'error');
  }

  showMessage(message: string, type: string) {
    let data: any = {
      message: message,
      type: type
    }
    this.toast.showToast(data);
  }

  getInforForm() {
    if(this.idCompany) {
      this.objectCompany = {
        id: this.idCompany,
        name: this.companyForm.controls['companyName'].value,
        businessName: this.companyForm.controls['fantasyName'].value,
        cnpj: this.companyForm.controls['cnpj'].value,
        email: this.companyForm.controls['email'].value,
        phone: this.companyForm.controls['phone'].value,
        contacts: this.objContactId
      }
      return;
    }

    this.objectCompany = {
      name: this.companyForm.controls['companyName'].value,
      businessName: this.companyForm.controls['fantasyName'].value,
      cnpj: this.companyForm.controls['cnpj'].value,
      email: this.companyForm.controls['email'].value,
      phone: this.companyForm.controls['phone'].value,
      contacts: this.objContactId
    }
  }


  createCompanyRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionCompany);
    this.varSubscriptionCompany = this.createCompanyUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  updateCompanyRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionCompany);
    this.varSubscriptionCompany = this.updateCompanyUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    window.dispatchEvent(new Event('COMPANY_REFRESH'));
  }

  errorResponse = (error: any) => {
    this.showMessage(`Ocorreu um erro tente novamente mais tarde ${error.statusCode}`, 'error');
  }

  mapContact(value: any) {
    const valueMapped = value.map((rs: any) => {
      return {
      id: rs.id,
      name: rs.name,
      email: rs.email,
      phone: rs.phone,
      companyId: rs.companyId,
      selected: false
      }
    });

    return valueMapped;
  }

}
