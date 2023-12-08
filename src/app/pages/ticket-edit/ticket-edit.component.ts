import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { ModalConfirmComponent } from 'src/app/components/modal-confirm/modal-confirm.component';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { searchPerson } from 'src/app/core/model/dropdow-searchperson/dropdown-search-person.model';
import { GetTicketId, SaveMessageTicketR, SaveMessageTicketS, ticketModel, UpdateTicketModel } from 'src/app/core/model/ticket/ticket.model';
import { GetRequesterByTicketUseCases } from 'src/app/core/usecase/requester/requester-by-ticket.usecases';
import { GetRequesterUseCases } from 'src/app/core/usecase/requester/requester.usecases';
import { GetResponsibleUseCases } from 'src/app/core/usecase/responsible/responsible.usecases';
import { GetMessageTicketUseCases } from 'src/app/core/usecase/ticket/get-messenger-ticket.usecases';
import { GetTicketByIdUseCases } from 'src/app/core/usecase/ticket/get-ticket-byid.usecases';
import { SaveMessageTicketUseCases } from 'src/app/core/usecase/ticket/save-messenger-ticket.usecases';
import { SaveRequesterTicketUseCases } from 'src/app/core/usecase/ticket/save-requester-ticket.usecases';
import { UpdateTicketUseCases } from 'src/app/core/usecase/ticket/update-ticket.usecases';
import { GetUserUseCases } from 'src/app/core/usecase/user/user.usecases';

@Component({
  selector: 'gb-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent implements OnInit, OnDestroy  {

  @ViewChild(ModalConfirmComponent) showModalConfirm!: ModalConfirmComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('publicCheck') publicCheck!: ElementRef;
  @ViewChild('internalCheck') internalCheck!: ElementRef;

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

  statusEditTicket: number = 0;
  idUserSelected: Observable<number> = new Observable<number>();
  ticketUpdateId: number | undefined;
  userData: any = JSON.parse(sessionStorage.getItem('info-user') || '');
  ticketID!: number;

  formAnsware = new FormGroup({
    text: new FormControl('', Validators.required),
    private: new FormControl(false),
    attachment: new FormControl([]),
  });
  subsctiptions: Subscription[] = []

  dataToEdit: GetTicketId[] = [];
  // Subscription in HttpRequets
  private readonly resposibleSubject: Subject<boolean> = new Subject();
  private readonly personSubject: Subject<boolean> = new Subject();

  messageLists: any = [];
  hadleLists: any = [];

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
    private updateTicket: UpdateTicketUseCases,
    private saveRequester: SaveRequesterTicketUseCases,
    private modalService: NgbModal,
    private route: Router,
    private getTicket: GetTicketByIdUseCases,
    private getUser: GetUserUseCases,
    private getRquestersByTicketId: GetRequesterByTicketUseCases,
    private getMessages: GetMessageTicketUseCases,
    private saveMessage: SaveMessageTicketUseCases
    ) {
      this.checkDataRoute();
    }

  ngOnInit() {
    this.getRequestersAll();
    this.getResponsiblesAll();
    this.subsctiptions.push(this.formAnsware.valueChanges.pipe(debounceTime(250)).subscribe(()=> this.verifyAllFields()))
  }

  ngOnDestroy(): void {
    this.personSubject.next(true);
    this.resposibleSubject.next(true);
    this.personSubject.unsubscribe();
    this.resposibleSubject.unsubscribe();
    this.subsctiptions.map((s=>s.unsubscribe()))
  }

  getSelectedPerson(event: any): void{
    const verifyId = this.personDataSelected.some((e:any) => e.id === event[0].id);
    if(verifyId) return;

    this.personDataSelected.push(event[0]);
    this.verifyAllFields();
  }

  removeDataSelected(index: number): void{
    this.personDataSelected.splice(index, 1);
    this.verifyAllFields();
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
console.log(this.dataToEdit[0].createdAt)
    let idAssing = this.assingForMe ? this.userData.id : this.reponsibleData[0].id

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


    let saveMessage = {
      ticketId: this.ticketID,
      subject: this.subjectTicket,
      category: this.getCategoryTicket[0].option,
      priority: Number(this.getPriorityTicket),
      userId: idAssing,
      status: this.resolveSatusName(this.statusTicket)
    }

    let subscriptionData = {
      next: (val:any) => {
        this.modalService.dismissAll();

        let data: any = {
          message: 'Edição salva sucesso!',
          type: 'success'
        }

        this.toast.showToast(data, '/ticket', 1500);
        //location.reload()
      },
      error: (erro: any) => {
        let data: any = {
          message: 'Erro na edição salva sucesso!',
          type: 'error'
        }

        this.toast.showToast(data, '/ticket', 1500);
      }
    }

    // Requisiçcões dependentes
    this.updateTicket.execute(saveMessage).pipe(switchMap((arr: any) => {

      const obs$ = this.personDataSelected.map((e:any) => {
        let req = {
            ticketId: this.ticketUpdateId,
            contactId: e.id
        }
        return this.saveRequester.execute(req)
      });

      return forkJoin(obs$);

    })).subscribe(subscriptionData);
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
    let category = this.getCategoryTicket.length > 0 ? true : false;
    let priority = this.getPriorityTicket !== '' ? true : false;
    let assing = this.assingForMe;
    let status = this.statusTicket !== '' ? true : false;
    let request = this.personDataSelected.length > 0 ? true : false;

    if(person && (repons || assing) && subject && category && priority && status && request){
      this.disabledSaveBtn = false;
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

  checkDataRoute(){
    const cehckRout = this.route.getCurrentNavigation()?.extras.state;

    if(typeof cehckRout === 'undefined'){
      this.route.navigate(['/ticket']);
      return;
    }

    const idTicket = cehckRout['data'].ticketId;
    this.ticketID = idTicket;

    this.getTicket.execute(idTicket).subscribe((e:any)  => {
      this.dataToEdit = [e];

      //Setar público ou privado
      let message = '';

      if(this.dataToEdit[0].internalanswer){
        message = this.dataToEdit[0].internalanswer;
        this.abaSelectedTwo = true;
        this.abaSelectedOne = false;
      }

      if(this.dataToEdit[0].publicanswer){
        message = this.dataToEdit[0].publicanswer;
        this.abaSelectedOne = true;
        this.abaSelectedTwo = false;
      }

      //Setar categoria
      this.dataCategory.forEach(el => {
        el.selected = false;
        if(el.option === this.dataToEdit[0].category){
          el.selected = true
        }
      })

      // Setar prioridade
      const priority = (val: number) => {
        let prior: any = {
          1: 'Baixo',
          2: 'Médio',
          3: 'Alto',
          4: 'Urgente',
          0: 'default'
        }
        return prior[val]
      }

      this.dataPriority.forEach(el => {
        el.selected = false;
        if(el.option === priority(this.dataToEdit[0].priority)){
          el.selected = true
        }
      })

      this.getPriorityTicket = String(this.dataToEdit[0].priority);

      // Buscar responsável
      let ticketUserId = this.dataToEdit[0].userId;

      this.getUser.execute(ticketUserId).subscribe((e:any) => {
        this.idUserSelected = new Observable<number>(f => f.next(e.id));
      })

      // Busca requesters
      let ticketId = this.dataToEdit[0].id
      this.getRquestersByTicketId.execute(ticketId).subscribe((e: any) => {
        let contact: any[]= [];

        e.forEach((el: any) => {
          contact.push({id: el.contact.id,  name: el.contact.name, contact: el.contact.email})
        });

        this.personDataSelected = contact;
      })

      // Buscar menssagens
      this.getMessages.execute(ticketId).subscribe(e => {
        this.messageLists = e;
        this.hadleLists = e
      })

      this.ticketUpdateId = this.dataToEdit[0].id
      this.getCategoryTicket = [{option: this.dataToEdit[0].category}];
      this.subjectTicket = this.dataToEdit[0].subject;
      this.subjectTicketMessage = message;
      this.statusEditTicket = this.dataToEdit[0].status;

    })
  }

  saveMessageToTicket(){
    const {text: answareText, private: answarePrivate, attachment: answareAttachment} = this.formAnsware.value;

    const eventDate = new Date();

    let saveMessage: SaveMessageTicketS = {
      ticketId: this.ticketID,
      answer: answareText,
      public: !answarePrivate,
      attachment: answareAttachment,
      createdAt: eventDate.toISOString(),
      updatedAt: eventDate.toISOString()
    }

    this.formAnsware.reset();

    this.saveMessage.execute(saveMessage).subscribe(e => {
        let addInArray =
        {
            id: e.id,
            ticketId: e.ticketId,
            answer: e.answer,
            public: e.public,
            attachment: e.attachment ?? [],
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
        }

        this.hadleLists.push(addInArray);
        this.messageLists = this.hadleLists;
    })

  }

  cancelSendMessenger(){
    this.subjectTicketMessage = '';
    this.verifyAllFields();
  }

  filterMessengersPublicInternal(): void{
    const publicChk = this.publicCheck.nativeElement.checked;
    const internalChk = this.internalCheck.nativeElement.checked;

    if((publicChk && internalChk) || (!publicChk &&!internalChk) ){
      this.messageLists = this.hadleLists;
    }

    if(publicChk && !internalChk){
      this.messageLists = this.hadleLists.filter((e: any) => e.public);
    }

    if(internalChk && !publicChk){
      this.messageLists = this.hadleLists.filter((e: any) => !e.public);
    }

  }


}
function debounceTime(arg0: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

