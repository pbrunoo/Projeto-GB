import { UserByIdUseCase } from './../../core/usecase/user/user-by-id.usecase';
import { ModalProfileComponent } from './../modal-profile/modal-profile.component';
import { ToastMessageComponent } from './../toast-message/toast-message.component';
import { ModalConfirmComponent } from 'src/app/components/modal-confirm/modal-confirm.component';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { tabsMenuDataShare } from '../../behavior/data-share/tabs-menu-share.service';
import { filter, Observable } from 'rxjs';
import { Console } from 'console';
import { tabsViewMenuDataShare } from 'src/app/behavior/data-share/tabs-view-menu-share.service';

@Component({
  selector: 'gb-topbar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  public controlTabs: boolean = false;
  public tabOne = true;
  public tabTwo = false;
  public tabThree = false;
  public tabFour = false;
  public tabFive = false;
  public tabSix = false;

  public tabViewOne = true;
  public tabViewTwo = false;
  public tabViewThree = false;
  public tabViewFour = false;
  public tabViewFive = false;
  public tabViewSix = false;
  public selectTab: number = 1;
  public quantifyTabs: any[] = [];
  isCollapsed: boolean = true;
  public identifyModule = '';
  public user!: string;
  public email!: string;
  public type!: number;

  title$ = new Observable<string>(e => e.next('Ticket'));
  @ViewChild(ModalConfirmComponent) showModalConfirm!: ModalConfirmComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild(ModalProfileComponent) showModalProfile!: ModalProfileComponent;

  constructor(
    private router: Router,
    private tabsMenuDataShare: tabsMenuDataShare,
    private tabsViewMenuDataShare: tabsViewMenuDataShare,
    private userByIdUseCase: UserByIdUseCase
  ) {
    window.addEventListener('CLEAR_TABS', () => {
      this.clearAll();
    });

    window.addEventListener('CLOSE_TAB_AFTER_SAVE', () => {
      this.showtoastFinal();
      this.closeTab(this.tabsMenuDataShare.getValue());
    });

    window.addEventListener('USE_REFRESH', () => {
      this.showtoastFinal();
      this.closeTab(this.tabsMenuDataShare.getValue());
    });

    this.quantifyTabs.push('one');
  }

  ngOnInit(): void {
    this.getInforUser();
    this.router.events.pipe(filter(e => e instanceof ActivationStart)).subscribe((e: any) => {
      if(e.snapshot.data && e.snapshot.data.title !== ''){
        this.title$ = new Observable<string>(t => t.next(e.snapshot.data.title));
        this.identifyModule = e.snapshot.data.title;
      }
    });
  }

  openCloseDropDown() {
    this.isCollapsed = !this.isCollapsed;

    // Marca se foi tocado para o accessor
    //this.markAsTouched();
  }

  verifyOutSideClick(evt: any) {
    if (evt.ots) this.isCollapsed = true;
  }


  openMoreTabs() {
    this.selectTab = 1;
    if(this.tabOne === false) {
      this.tabOne = true;
      this.controlTabs = true;
      this.mapPositionTabOne(this.controlTabs);
      this.setTabs(1);
      this.setViewTabs(true, 1);
      return;
    }

    if(this.tabOne === true && this.tabTwo === false) {
      this.tabTwo = true;
      this.selectTab = 2;
      this.quantifyTabs.push('two');
      this.setTabs(2);
      this.setViewTabs(true, 2);
      return;
    }

    if(this.tabTwo === true && this.tabThree === false) {
      this.tabThree = true;
      this.selectTab = 3;
      this.quantifyTabs.push('three');
      this.setTabs(3);
      this.setViewTabs(true, 3);
      return;
    }

    if(this.tabThree === true && this.tabFour === false) {
      this.tabFour = true;
      this.selectTab = 4;
      this.quantifyTabs.push('four');
      this.setTabs(4);
      this.setViewTabs(true, 4);
      return;
    }

    if(this.tabFour === true && this.tabFive === false) {
      this.tabFive = true;
      this.selectTab = 5;
      this.quantifyTabs.push('five');
      this.setTabs(5);
      this.setViewTabs(true, 5);
      return;
    }

    if(this.tabFive === true && this.tabSix === false) {
      this.tabSix = true;
      this.selectTab = 6;
      this.quantifyTabs.push('six');
      this.setTabs(6);
      this.setViewTabs(true, 6);
      return;
    }
  }

  mapPositionTabOne(position: boolean) {
    if(position === true) {
      this.quantifyTabs.push('one');
    }
  }

  closeTab(position: number) {

    if(this.quantifyTabs.length === 1) {
      return;
    }

    if(position === 1) {
      this.tabOne = false;
      this.quantifyTabs.splice(this.quantifyTabs.indexOf('one'), 1);
      this.positionAvailable(this.quantifyTabs[0]);
      this.controlTabs = false;
      this.setViewTabs(false, 1);
      return;
    }

    if(position === 2) {
      this.tabTwo = false;
      this.quantifyTabs.splice(this.quantifyTabs.indexOf('two'), 1);
      this.setViewTabs(false, 2);
      this.positionAvailable(this.quantifyTabs[0]);
      return;
    }

    if(position == 3) {
      this.tabThree = false;
      this.quantifyTabs.splice(this.quantifyTabs.indexOf('three'), 1);
      this.setViewTabs(false, 3);
      this.positionAvailable(this.quantifyTabs[0]);
      return;
    }

    if(position == 4) {
      this.tabFour = false;
      this.quantifyTabs.splice(this.quantifyTabs.indexOf('four'), 1);
      this.setViewTabs(false, 4);
      this.positionAvailable(this.quantifyTabs[0]);
      return;
    }

    if(position == 5) {
      this.tabFive = false;
      this.quantifyTabs.splice(this.quantifyTabs.indexOf('five'), 1);
      this.setViewTabs(false, 5);
      this.positionAvailable(this.quantifyTabs[0]);
      return;
    }

    if(position == 6) {
      this.tabSix = false;
      this.quantifyTabs.splice(this.quantifyTabs.indexOf('six'), 1);
      this.setViewTabs(false, 6);
      this.positionAvailable(this.quantifyTabs[0]);
      return;
    }
  }

  selectedTab(tab: any) {
    if(tab === 1) {
      this.selectTab = 1;
      this.setTabs(1);
      return;
    }

    if(tab === 2) {
      this.selectTab = 2;
      this.setTabs(2);
      return;
    }

    if(tab === 3) {
      this.selectTab = 3;
      this.setTabs(3);
      return;
    }

    if(tab === 4) {
      this.selectTab = 4;
      this.setTabs(4);
      return;
    }

    if(tab === 5) {
      this.selectTab = 5;
      this.setTabs(5);
      return;
    }

    if(tab === 6) {
      this.selectTab = 6;
      this.setTabs(6);
      return;
    }
  }

  positionAvailable(param: any) {
    if(param === 'one') {
      this.selectTab = 1;
      this.selectedTab(1);
      this.setTabs(1);
      return;
    }

    if(param === 'two') {
      this.selectTab = 2;
      this.selectedTab(2);
      this.setTabs(2);
      return;
    }

    if(param === 'three') {
      this.selectTab = 3;
      this.selectedTab(3);
      this.setTabs(3);
      return;
    }

    if(param === 'four') {
      this.selectTab = 4;
      this.selectedTab(4);
      this.setTabs(4);
      return;
    }

    if(param === 'five') {
      this.selectTab = 5;
      this.selectedTab(5);
      this.setTabs(5);
      return;
    }

    if(param === 'six') {
      this.selectTab = 6;
      this.selectedTab(6);
      this.setTabs(6);
      return;
    }
  }

  setTabs(tabs: any) {
   this.tabsMenuDataShare.setValue(tabs);
    window.dispatchEvent(new Event('GET_TAB'));
  }

  setViewTabs(condition: boolean, tabs: any) {
    let data = {
      tabCondition: condition,
      tabNumber: tabs
    }
    this.tabsViewMenuDataShare.setValue(data);
     window.dispatchEvent(new Event('GET_VIEW_TAB'));
   }

  clearAll() {
    this.tabOne = true;
    this.tabTwo = false;
    this.tabThree = false;
    this.tabFour = false;
    this.tabFive = false;
    this.tabSix = false;
    this.quantifyTabs = [];
    this.quantifyTabs.push('one');
    this.controlTabs = false;
    this.tabViewOne = true;
    this.tabViewTwo = false;
    this.tabViewThree = false;
    this.tabViewFour = false;
    this.tabViewFive = false;
    this.tabViewSix = false;
    this.selectTab = 1;
  }

  closeWindow() {

  }

  logout() {
    this.showModalConfirm.open('logout');
  }

  showtoastFinal() {
    let data: any = {
      message: 'Ticket emitido com sucesso!',
      type: 'success'
    }

    if(this.quantifyTabs.length == 1) {
    this.toast.showToast(data, '/ticket', 500);
    window.dispatchEvent(new Event('CLEAR_ALL'));
    return;
    }

     this.toast.showToast(data, '', 2000);
  }

  openModalProfile() {
    this.showModalProfile.open();
  }

  getInforUser() {
    const data: any = sessionStorage.getItem('info-user');
    const dataJson = JSON.parse(data)
    this.userByIdUseCase.execute(dataJson.id)
    .subscribe({
      next: (res)=> {
        this.user = res.name;
        this.email = res.email;
        this.type = res.type;
      },
      error: (e)=> console.log(e)
    }
    );
  }
}
