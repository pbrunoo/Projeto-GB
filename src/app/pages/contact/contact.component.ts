import { tabsViewMenuDataShare } from 'src/app/behavior/data-share/tabs-view-menu-share.service';
import { tabsMenuDataShare } from 'src/app/behavior/data-share/tabs-menu-share.service';
import { ContactSearchUseCase } from './../../core/usecase/contact/contact-search.usecase';
import { CompanyByIdUseCase } from './../../core/usecase/company/company-by-id.usecase';
import { DeleteContactUseCase } from 'src/app/core/usecase/contact/delete-contact.usecase';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { ContactUseCase } from './../../core/usecase/contact/contact.usecase';
import { Subscription } from 'rxjs';
import { ModalContactComponent } from './../../components/modal-contact/modal-contact.component';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'gb-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactData!: any;
  public typeModule: string = 'Contatos';
  public objcontact:any = [];
  public varSubscriptionCompany!: Subscription;
  public showLoad: boolean = true;
  public idDelete: any;
  public listCompany: any;
  public contactAllComplete: any;
  public searchPerson: boolean = false;

  public tabView = 1;
  tabOne: boolean = true;
  tabTwo: boolean = false;
  tabThree: boolean = false;
  tabFour: boolean = false;
  tabFive: boolean = false;
  tabSix: boolean = false;

  @ViewChild(ModalContactComponent) showModalContact!: ModalContactComponent;
  @ViewChild(ModalDeleteComponent) showModaldelete!: ModalDeleteComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;

  constructor(
    private contactUseCase: ContactUseCase,
    private contactSearchUseCase: ContactSearchUseCase,
    private deleteContactUseCase: DeleteContactUseCase,
    private companyByIdUseCase: CompanyByIdUseCase,
    private tabsMenuDataShare: tabsMenuDataShare,
    private tabsViewMenuDataShare: tabsViewMenuDataShare
  ) {
    window.addEventListener('CONTACT_REFRESH', ()=> {
      this.requestContacts();
    });

    window.addEventListener('GET_TAB', ()=> {
      this.tabView = tabsMenuDataShare.getValue();
    });

    window.addEventListener('CLEAR_ALL', ()=> {
      this.clearAll();
    });

    window.addEventListener('GET_VIEW_TAB', ()=> {
      const actionData = tabsViewMenuDataShare.getValue();
      actionData.tabCondition === true ? this.openWindow(actionData) : this.closeWindow(actionData);
    });
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

  selectedWindow() {

    //window.dispatchEvent(new Event('SET_CLASS_SELECTED'));
  }

  openWindow(tab: any) {
    if(tab.tabNumber === 1 && tab.tabCondition === true) {
      this.tabOne = true;
      return;
    }

    if(tab.tabNumber === 2 && tab.tabCondition === true) {
      this.tabTwo = true;
      return;
    }

    if(tab.tabNumber === 3 && tab.tabCondition === true) {
      this.tabThree = true;
      return;
    }

    if(tab.tabNumber === 4 && tab.tabCondition === true) {
      this.tabFour = true;
      return;
    }

    if(tab.tabNumber === 5 && tab.tabCondition === true) {
      this.tabFive  = true;
      return;
    }

    if(tab.tabNumber === 6 && tab.tabCondition === true) {
      this.tabSix  = true;
      return;
    }
  }

  closeWindow(tab: any) {
    if(tab.tabNumber === 1 && tab.tabCondition === false) {
      this.tabOne = false;
      return;
    }

    if(tab.tabNumber === 2 && tab.tabCondition === false) {
      this.tabTwo = false;
      return;
    }

    if(tab.tabNumber === 3 && tab.tabCondition === false) {
      this.tabThree = false;
      return;
    }

    if(tab.tabNumber === 4 && tab.tabCondition === false) {
      this.tabFour = false;
      return;
    }

    if(tab.tabNumber === 5 && tab.tabCondition === false) {
      this.tabFive  = false;
      return;
    }

    if(tab.tabNumber === 6 && tab.tabCondition === false) {
      this.tabSix  = false;
      return;
    }
  }

  saveEvent(event: any) {
    const data = {
      tabNumber: event,
      tabCondition: false
    }
    this.closeWindow(data);
  }

  clearAll() {
    this.tabView = 1;
    this.tabOne = true;
    this.tabTwo = false;
    this.tabThree = false;
    this.tabFour = false;
    this.tabFive= false;
    this.tabSix = false;
  }
}
