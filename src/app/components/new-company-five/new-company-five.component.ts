import { CompanySearchUseCase } from '../../core/usecase/company/company-search.usecase';
import { GetTicketByIdUseCases } from 'src/app/core/usecase/ticket/get-ticket-byid.usecases';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { DeleteCompanyUseCase } from '../../core/usecase/company/delete-company.usecase';
import { CompanyUseCase } from '../../core/usecase/company/company.usecase';
import { Subscription } from 'rxjs';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { ModalCompanyComponent } from '../modal-company/modal-company.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DeleteContactUseCase } from 'src/app/core/usecase/contact/delete-contact.usecase';

@Component({
  selector: 'gb-new-company-five',
  templateUrl: './new-company-five.component.html',
  styleUrls: ['./new-company-five.component.scss']
})
export class NewCompanyFiveComponent implements OnInit {

  public idDelete!: number;
  public varSubscriptionCompany!: Subscription;
  public companyData: any;
  public typeModule: string = 'company';
  public objcompany: any;
  public showLoad: boolean = false;
  public messageToast!: string;

  @ViewChild(ModalCompanyComponent) showModalCompany!: ModalCompanyComponent;
  @ViewChild(ModalDeleteComponent) showModaldelete!: ModalDeleteComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;

  constructor(
    private elementRef: ElementRef,
    private companyUseCase: CompanyUseCase,
    private deleCompanyUseCase: DeleteCompanyUseCase,
    private deleteContactUseCase: DeleteContactUseCase,
    private companySearchUseCase: CompanySearchUseCase
  ) {
    window.addEventListener('COMPANY_REFRESH', ()=> {
      this.requestAllCompany();
    });
  }

  ngOnInit(): void {
    this.requestAllCompany();
  }

  toggleContact(collapseContact: HTMLElement, indexIcon: HTMLElement) {
    this.toggleIcons(indexIcon);
    const doom: HTMLElement = this.elementRef.nativeElement;
    const elements = doom.querySelectorAll('.view-collapse');

    elements.forEach((element, i) => {

      if(collapseContact === elements[i]) {
        return;
      }

      if(element.classList.contains('view-collapse')) {
        elements[i].classList.remove('view-collapse');
      }
    });

    if(collapseContact.classList.contains('view-collapse')) {
      collapseContact.classList.remove('view-collapse');
      return;
    }
    collapseContact.classList.add('view-collapse');
  }

  toggleIcons(index: HTMLElement) {
    const doom: HTMLElement = this.elementRef.nativeElement;
    const elements = doom.querySelectorAll('.icon-Up');

    elements.forEach((element, i) => {

      if(index === elements[i]) {
        return;
      }

      if(element.classList.contains('icon-Up')) {
        elements[i].classList.remove('icon-Up');
      }
    });

    if(index.classList.contains('icon-Up')) {
      index.classList.remove('icon-Up');
      return;
    }
    index.classList.add('icon-Up');
  }

  editCompany(event: string, id: any) {
    this.companyData = this.objcompany.find((res: any) => res.id === id);
    this.showModalCompany.openXl(event, this.companyData);
  }

  showModalDelete(type: string, id: any) {
    this.idDelete = id;
    this.showModaldelete.open(type);
  }

  deleteRegister(value: string) {
    let usecase;
    if(value === 'company') {
      usecase = this.deleCompanyUseCase;
      this.messageToast = 'Empresa removida com sucesso!';
      this.deleteRequest(usecase);
      return;
    }
        usecase = this.deleteContactUseCase;
        this.messageToast = 'Contato removido com sucesso!';
        this.deleteRequest(usecase);
  }


  deleteRequest(req: any) {
    this.unsubscriptionVariable(this.varSubscriptionCompany);
    this.varSubscriptionCompany = req.execute(this.idDelete)
    .subscribe(
      this.successDeleteResponse,
      this.errorDeleteResponse
    );
  }

  successDeleteResponse = (res: any) => {
    this.showMessage(this.messageToast, 'success');
    this.showLoad = false;
    this.requestAllCompany();
  }

  errorDeleteResponse = (error: any) => {
    this.showLoad = false;
    console.log(error)
    error.status === 500 ?
      this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error') :
      this.showMessage('Contato vinculado ao ticket não pode ser excluído', 'error');
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  requestAllCompany() {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionCompany);
     this.companyUseCase.execute()
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  requestSearchCompany(param: string) {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionCompany);
     this.companySearchUseCase.execute(param)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.objcompany = res.sort((a: any ,b: any) => b - a);
    this.showLoad = false;
  }

  errorResponse = (error: any) => {
    this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
    this.showLoad = false;
  }

  showMessage(message: string, type: string) {
    const data: any = {
      message: message,
      type: type
    }

    this.toast.showToast(data);
  }

  reseivedSearch(event: string) {
    this.requestSearchCompany(event)
  }
}
