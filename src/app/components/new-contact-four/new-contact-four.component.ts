import { tabsMenuDataShare } from 'src/app/behavior/data-share/tabs-menu-share.service';
import { ContactSearchUseCase } from '../../core/usecase/contact/contact-search.usecase';
import { CompanyByIdUseCase } from '../../core/usecase/company/company-by-id.usecase';
import { DeleteContactUseCase } from 'src/app/core/usecase/contact/delete-contact.usecase';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { ContactUseCase } from '../../core/usecase/contact/contact.usecase';
import { Subscription } from 'rxjs';
import { ModalContactComponent } from '../modal-contact/modal-contact.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gb-new-contact-four',
  templateUrl: './new-contact-four.component.html',
  styleUrls: ['./new-contact-four.component.scss']
})
export class NewContactFourComponent implements OnInit {

  public contactData!: any;
  public typeModule: string = 'Contatos';
  public objcontact:any = [];
  public varSubscriptionCompany!: Subscription;
  public showLoad: boolean = true;
  public idDelete: any;
  public listCompany: any;
  public contactAllComplete: any;
  public searchPerson: boolean = false;
  public tabContact = 'contatos-2';

  @ViewChild(ModalContactComponent) showModalContact!: ModalContactComponent;
  @ViewChild(ModalDeleteComponent) showModaldelete!: ModalDeleteComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;

  @Output() sendTab = new EventEmitter<number>();

  constructor(
    private contactUseCase: ContactUseCase,
    private contactSearchUseCase: ContactSearchUseCase,
    private deleteContactUseCase: DeleteContactUseCase,
    private companyByIdUseCase: CompanyByIdUseCase,
    private tabsMenuDataShare: tabsMenuDataShare
  ) {
    window.addEventListener('CONTACT_REFRESH', ()=> {
      this.requestContacts();
    });

    this.tabsMenuDataShare.setValue(this.tabContact);
  }

  ngOnInit(): void {
    this.requestContacts();
  }

  editContact(event: string, id: any) {
    this.contactData = this.objcontact.find((res: any) => res.id === id);
    this.showModalContact.open(event, this.contactData);
  }

  deleteContactRegister(type: string, id: any) {
      this.idDelete = id;
      this.showModaldelete.open(type);
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  deleteRegister(event: any) {
    this.deleteRequest();
  }


  deleteRequest() {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionCompany);
    this.varSubscriptionCompany = this.deleteContactUseCase.execute(this.idDelete)
    .subscribe(
      this.successDeleteResponse,
      this.errorDeleteResponse
    );
  }

  successDeleteResponse = (res: any) => {
    this.showMessage('Contato removido com sucesso!', 'success');
    setTimeout(()=> { this.showLoad = false;},700);
    this.requestContacts();
  }

  errorDeleteResponse = (error: any) => {
    setTimeout(()=> { this.showLoad = false;},700);
    error.status === 500 ?
      this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error') :
      this.showMessage('Contato vinculado ao ticket não pode ser excluído', 'error');
  }

  showMessage(message: string, type: string) {
    let data: any = {
      message: message,
      type: type
    }
    this.toast.showToast(data);
  }

  requestCompanyById(id: any): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.companyByIdUseCase.execute(id)
      .subscribe((res) => {
        resolve(res);
      },
      (error) => {
        this.showMessage('', 'error');
      });
    });
  }

  async requestContacts () {
    this.showLoad = true;
    this.contactUseCase.execute().subscribe(async (res: any) => {
      this.contactAllComplete = res.sort((a: any ,b: any) => b.id - a.id);
      this.objcontact = await Promise.all(this.contactAllComplete.map(async (res: any)=> {
        const listCompany = await this.requestCompanyById(res.companyId);
        const company = listCompany;
        this.searchPerson = true;
        setTimeout(()=> { this.showLoad = false;},700);
        return {
          ...res,
          companyName: company.businessName
        }
      }));
    });
  }

  async requestContactsSearch (param: string) {
    this.showLoad = true;
    this.contactSearchUseCase.execute(param).subscribe(async (res: any) => {
      this.contactAllComplete = res;
      this.objcontact = await Promise.all(this.contactAllComplete.map(async (res: any)=> {
        const listCompany = await this.requestCompanyById(res.companyId);
        const company = listCompany;
        this.searchPerson = true;
        setTimeout(()=> { this.showLoad = false;},700);
        return {
          ...res,
          companyName: company.businessName
        }
      }));
    });
  }

  reseivedSearch(event: string) {
   this.requestContactsSearch(event);
  }

  identifyTabAfterSave() {
    this.sendTab.emit(1);
    this.tabsMenuDataShare.setValue(1);
    window.dispatchEvent(new Event('CLOSE_TAB_AFTER_SAVE'));
  }
}
