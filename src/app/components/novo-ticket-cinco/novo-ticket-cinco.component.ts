import { tabsMenuDataShare } from '../../behavior/data-share/tabs-menu-share.service';
import { SaveMessageTicketS } from '../../core/model/ticket/ticket.model';
import { ticketModel } from 'src/app/core/model/ticket/ticket.model';
import { SaveMessageTicketUseCases } from '../../core/usecase/ticket/save-messenger-ticket.usecases';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaveRequesterTicketUseCases } from 'src/app/core/usecase/ticket/save-requester-ticket.usecases';
import { SaveTicketUseCases } from 'src/app/core/usecase/ticket/ticket.usecases';
import { GetResponsibleUseCases } from 'src/app/core/usecase/responsible/responsible.usecases';
import { GetRequesterUseCases } from 'src/app/core/usecase/requester/requester.usecases';
import { searchPerson } from 'src/app/core/model/dropdow-searchperson/dropdown-search-person.model';
import { Subject, switchMap, forkJoin, takeUntil } from 'rxjs';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { ModalConfirmComponent } from 'src/app/components/modal-confirm/modal-confirm.component';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gb-novo-ticket-cinco',
  templateUrl: './novo-ticket-cinco.component.html',
  styleUrls: ['./novo-ticket-cinco.component.scss']
})
export class NovoTicketCincoComponent implements OnInit, OnDestroy {
  @ViewChild(ModalConfirmComponent) showModalConfirm!: ModalConfirmComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @Output() sendTab = new EventEmitter<number>();
  public tabTicket = 'ticket-2';
  titleSearch: string = 'Selecione';
  personDataSelected: any = [];
  fileList:any = [];
  reponsibleData: any = null;
  abaSelectedOne: boolean = true;
  abaSelectedTwo: boolean  = false;
  isCollapsed: boolean = false;
  isFileUpload: boolean = false;
  subjectTicket: string = '';
  getCategoryTicket: any = [];
  getPriorityTicket: string = '';
  subjectTicketMessage: string = '';
  assingForMe: boolean = false;
  disabledResponsable: boolean = false;
  disabledSaveBtn: boolean = true;
  showSelfcomponent: boolean = false;
  statusTicket: string = '';
  userData: any = JSON.parse(sessionStorage.getItem('info-user') || '');

  // Subscription in HttpRequets
  private readonly resposibleSubject: Subject<boolean> = new Subject();
  private readonly personSubject: Subject<boolean> = new Subject();

  messageLists = [
    {
      id: 125,
      type: 'public',
      name: 'Fulano',
      dataMessage: '2023-02-01 17:27:00',
      message: 'Esté é o conteúdo da mensagem.',
      files: ['file1.pdf', 'file2.pdf']
    },{
      id: 125,
      type: 'public',
      name: 'Fulano',
      dataMessage: '2023-02-01 17:27:00',
      message: 'Esté é o conteúdo da mensagem.',
      files: ['file1.pdf', 'file2.pdf']
  }]

  personData: searchPerson[] = [];

  responsData: any = [];

  dataCategory = [
    {
      option: 'Selecione...',
      class: 'initial',
      selected: true,
    },
    {
    option: 'Dúvidas',
    class: 'aberto',
    selected: false,
  },
  {
    option: 'Palavras chave',
    class: 'aberto',
    selected: false,
  },
  {
    option: 'Fotos 360º',
    class: 'aberto',
    selected: false,
  },
  {
    option: 'Perfil não aparece',
    class: 'aberto',
    selected: false,
  },
  {
    option: 'Relatórios',
    class: 'aberto',
    selected: false,
  }]

  dataPriority = [
    {
      option: 'Selecione...',
      class: 'initial',
      selected: true,
    },
    {
      option: 'Baixo',
      class: 'baixo',
      selected: false,
    },
    {
      option: 'Médio',
      class: 'medio',
      selected: false,
    },
    {
      option: 'Alto',
      class: 'alto',
      selected: false,
    },
    {
      option: 'Urgente',
      class: 'urgente',
      selected: false,
    }
  ]

  constructor(
    private elementRef: ElementRef,
    private getRequesters: GetRequesterUseCases,
    private getResponsibles: GetResponsibleUseCases,
    private saveTicket: SaveTicketUseCases,
    private saveRequester: SaveRequesterTicketUseCases,
    private modalService: NgbModal,
    private saveMessage: SaveMessageTicketUseCases,
    private tabsMenuDataShare: tabsMenuDataShare
    ) {
      this.tabsMenuDataShare.setValue(this.tabTicket);

    }

  ngOnInit() {
    this.getRequestersAll();
    this.getResponsiblesAll();
  }

  ngOnDestroy(): void {
    this.personSubject.next(true);
    this.resposibleSubject.next(true);
    this.personSubject.unsubscribe();
    this.resposibleSubject.unsubscribe();
  }

  getSelectedPerson(event: any): void{
    const verifyId = this.personDataSelected.some((e:any) => e.id === event[0].id);
    if(verifyId) return;

    this.personDataSelected.push(event[0]);
    this.verifyAllFields();
  }

  removeDataSelected(index: number): void{
    this.personDataSelected.splice(index, 1);
  }

  selectAba(index: number): void{
    if(index === 1){
      this.abaSelectedOne = true;
      this.abaSelectedTwo = false;
      return
    }

    this.abaSelectedOne = false;
    this.abaSelectedTwo = true;
  }

  openWriteEditMessage(evt: HTMLElement, ico: HTMLElement): void{

    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.isVisible');
    const elementsUp = dom.querySelectorAll('.icon-Up');

    // Organizar setas ao clicar
    elementsUp.forEach((e,i) => {
      console.log(e)

      if(ico === elementsUp[i]){
        return
      }

      if(e.classList.contains('icon-Up')){
        elementsUp[i].classList.remove('icon-Up');
      }
    })

    // Exibir apenas um por clique
    elements.forEach((e, i) => {
      if(evt === elements[i]){
        return
      }

      if(e.classList.contains('isVisible')){
        elements[i].classList.remove('isVisible');
      }
    })

    if (evt.classList.contains('isVisible') && ico.classList.contains('icon-Up')){
      evt.classList.remove('isVisible');
      ico.classList.remove('icon-Up');
      return;
    }

    ico.classList.add('icon-Up');
    evt.classList.add('isVisible');
  }

  changeFileSelected(evt: any): void{
    let files = this.fileList.length;

    for(let i = 0; i < files; i++){
      if(evt.target.files[0].name === this.fileList[i].name){
        console.log('ja existe o arquivo -------------------------------- ')
        return
      }
    }

    if(evt.target.files.length && evt.target.files.length > 0){
      this.fileList.push(evt.target.files[0]);
    }
  }

  removeFileMessage(index: number): void{
    this.fileList.splice(index,1);
  }

  opeModal(){
    this.showModalConfirm.open('ticket', []);
  }

  salveNewTicket(){

    let idAssing = this.assingForMe ? this.userData.id : this.reponsibleData[0].id;

    let sendData: ticketModel = {
      subject: this.subjectTicket,
      category: this.getCategoryTicket[0].option,
      publicanswer: this.abaSelectedOne ? this.subjectTicketMessage : '',
      internalanswer: this.abaSelectedTwo ? this.subjectTicketMessage : '',
      priority: Number(this.getPriorityTicket),
      userId: idAssing,
      status:  this.resolveSatusName(this.statusTicket)
    }

    let subscriptionData = {
      next: (val:any) => {
        this.modalService.dismissAll();

        let data: any = {
          message: 'Ticket emitido por sucesso!',
          type: 'success'
        }

        this.toast.showToast(data);
        //location.reload()
      },
      error: (erro: any) => {
        console.log(erro)
      }
    }


    // Requisiçcões dependentes
    this.saveTicket.execute(sendData).pipe(switchMap((arr: any) => {

      const obs$ = this.personDataSelected.map((e:any) => {
        let req = {
            ticketId: arr.id,
            contactId: e.id
        }
        return this.saveRequester.execute(req);
      });

      return forkJoin(obs$);

    })).pipe(switchMap((ar: any) => {

      const resolvePublicInternal = ():boolean => {
        let value: boolean = false;

        if(this.abaSelectedOne){
          this.abaSelectedTwo = false;
          value = true;
        }

        if(this.abaSelectedTwo){
          this.abaSelectedOne = false;
          value = false;
        }

        return value;
      }

      const eventDate = new Date();
      let saveMessage: SaveMessageTicketS = {
        ticketId: ar[0].ticketId,
        answer: this.subjectTicketMessage,
        public: resolvePublicInternal(),
        createdAt: eventDate.toISOString(),
        updatedAt: eventDate.toISOString()
      }

      return this.saveMessage.execute(saveMessage);

    })).subscribe(subscriptionData);
    this.identifyTabAfterSave();
  }

  getResponsible(evt: any){
    this.reponsibleData = evt;
    this.verifyAllFields();
  }

  getPriority(evt: any){
    let priority: any = {
      'Baixo': 1,
      'Médio': 2,
      'Alto': 3,
      'Urgente': 4,
      'default': 1
    }

    this.getPriorityTicket = priority[evt[0].option] || priority['default'];
    this.verifyAllFields();
  }

  getCategory(evt: any){
    this.getCategoryTicket = evt;
    this.verifyAllFields();
  }

  getRequestersAll(){
    this.getRequesters.execute()
      .pipe(takeUntil(this.personSubject)).subscribe((e: any) => {
      this.personData = e;
    })
  }

  getResponsiblesAll(){
    this.getResponsibles.execute()
      .pipe(takeUntil(this.resposibleSubject)).subscribe(e => {
      this.responsData = e;
    })
  }

  verifyAllFields(): void{
    let person = this.personData.length > 0 ? true : false;
    let repons = this.responsData.length > 0 ? true : false;
    let subject = this.subjectTicket !== '' ? true : false;
    let subjetMessage = this.subjectTicketMessage !== '' ? true : false;
    let category = this.getCategoryTicket.length > 0 ? true : false;
    let priority = this.getPriorityTicket !== '' ? true : false;
    let assing = this.assingForMe;
    let status = this.statusTicket !== '' ? true : false;

    if(person && (repons || assing) && subject && subjetMessage && category && priority && status){
      this.disabledSaveBtn = false;
      console.log('todos preenchidos')
      return;
    }
    this.disabledSaveBtn = true;
  }

  onCheckAssingToMeChanged(val: boolean){
    if(val){
      this.disabledResponsable = true;
      this.assingForMe = val;
      return
    }
    this.disabledResponsable = false;
  }

  changeSubjectTicket(){
    this.verifyAllFields();
  }

  changeMessagetTicket(){
    this.verifyAllFields();
  }

  metodoTeste(evt: any){
    console.log(evt)
  }

  getStatus(evt: any){
    this.statusTicket = evt[0].option;
    this.verifyAllFields();
  }

  resolveSatusName(stat: string){
    let status: any = {
      Aberto: 1,
      Pendente: 3,
      Resolvido: 2,
      Excluído: 4
    }

    return status[stat];
  }

  identifyTabAfterSave() {
    this.sendTab.emit(5);
    this.tabsMenuDataShare.setValue(5);
    window.dispatchEvent(new Event('CLOSE_TAB_AFTER_SAVE'));
  }
}
