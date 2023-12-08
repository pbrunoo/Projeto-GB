import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { searchPerson } from 'src/app/core/model/dropdow-searchperson/dropdown-search-person.model';
import { ListTicketModel } from 'src/app/core/model/ticket/ticket.model';
import { GetRequesterUseCases } from 'src/app/core/usecase/requester/requester.usecases';
import { GetResponsibleUseCases } from 'src/app/core/usecase/responsible/responsible.usecases';
import { DeleteTicketWithStatusUseCases } from 'src/app/core/usecase/ticket/delete-with-status-ticket.usecases';
import { FilterTicketUseCases } from 'src/app/core/usecase/ticket/list-ticket-filter.usecases';
import { ListTicketUseCases } from 'src/app/core/usecase/ticket/list-ticket.usecases';
import { ModalGlobalComponent } from '../global-modal/global-modal.component';

@Component({
  selector: 'gb-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  animations: [trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 , with: 0 }),
      animate('100ms', style({ opacity: 1, with: 300 })),
    ]),
    transition(':leave', [
      animate( '100ms', style({ opacity: 0, with: 0 })),
    ])
  ])]
})

export class TicketListComponent implements OnInit {

  @ViewChild(ModalGlobalComponent) showGlobalModal!: ModalGlobalComponent;

  qtyItens = [{
    "id": 2,
    "subject": "teste subject",
    "category": "Dúvidas",
    "publicanswer": "teste publico",
    "internalanswer": "teste interno",
    "priority": 1,
    "userId": 4,
    "status": 2
  },
  {
    "id": 3,
    "subject": "Teste",
    "category": "Dúvidas",
    "publicanswer": "publico",
    "internalanswer": "privado",
    "priority": 1,
    "userId": 5,
    "status": 1
  },
  {
    "id": 4,
    "subject": "adas",
    "category": "Palavras chave",
    "publicanswer": "adasdsdasd",
    "internalanswer": "",
    "priority": 3,
    "userId": 3,
    "status": 3
  },
  {
    "id": 5,
    "subject": "adas",
    "category": "Palavras chave",
    "publicanswer": "adasdsdasd",
    "internalanswer": "",
    "priority": 3,
    "userId": 3,
    "status": 4
  },
  {
    "id": 6,
    "subject": "adas",
    "category": "Palavras chave",
    "publicanswer": "adasdsdasd",
    "internalanswer": "",
    "priority": 3,
    "userId": 3,
    "status": 4
  }]

  items = [{
    title: 'Todos os tickets',
    qtyItem: 0,
    selected: true
  },
  {
    title: 'Tickets aberto',
    qtyItem: 0,
    selected: false
  },
  {
    title: 'Tickets pendentes',
    qtyItem: 0,
    selected: false
  },
  {
    title: 'Tickets resolvidos',
    qtyItem: 0,
    selected: false
  },
  {
    title: 'Tickets excluídos',
    qtyItem: 0,
    selected: false
  },
  ]

  dataCategory = [
    {
      option: 'Selecione uma ou mais categorias',
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
      option: 'Selecione uma ou mais prioridades',
      id: null,
      class: 'initial',
      selected: true,
    },
    {
      option: 'Baixo',
      id: 1,
      class: 'baixo',
      selected: false,
    },
    {
      option: 'Médio',
      id: 2,
      class: 'medio',
      selected: false,
    },
    {
      option: 'Alto',
      id: 3,
      class: 'alto',
      selected: false,
    },
    {
      option: 'Urgente',
      id: 4,
      class: 'urgente',
      selected: false,
    }
  ]

  ticketDetail: ListTicketModel[] = [];
  ticketDetailBkup: ListTicketModel[] = [];
  searchTerms: any = '';
  loading: boolean = false;
  showCup: boolean = false;
  itemsMenu: any = [];
  menuFilter: boolean = false;
  personData: searchPerson[] = [];
  responsavel: any = [];

  // Variaveis que irão armazenas os filtros
  requester: any = [];
  personCharge: any = [];
  category: any = [];
  priority: any = [];
  modelStart: NgbDateStruct = {
    "year": 0,
    "month": 0,
    "day": 0
  }

  modelEnd: NgbDateStruct = {
    "year": 0,
    "month": 0,
    "day": 0
  }

  filterToList: string = '';

  constructor(
    private router: Router,
    private getListTicket: ListTicketUseCases,
    private deleteWithStatusTicketId: DeleteTicketWithStatusUseCases,
    private modalService: NgbModal,
    private getRequesters: GetRequesterUseCases,
    private getResponsibles: GetResponsibleUseCases,
    private filter: FilterTicketUseCases
  ) { }

  ngOnInit(): void {
    this.listTicket();
    this.getRequestersAll();
    this.getResponsiblesAll();
  }

  sumStatusItens(data: any) {

    this.items[0].qtyItem = this.ticketDetailBkup.length;

    let tkcPendent = 0;
    let tkcOpen = 0;
    let tkcSolved = 0;
    let tkcDelete = 0;

    this.ticketDetail.forEach(e => {

      if (e.status === 3) {
        tkcPendent += 1;
      }

      if (e.status === 1) {
        tkcOpen += 1;
      }

      if (e.status === 2) {
        tkcSolved += 1;
      }

      if (e.status === 4) {
        tkcDelete += 1;
      }

    })

    this.items[4].qtyItem = tkcDelete;
    this.items[1].qtyItem = tkcOpen;
    this.items[2].qtyItem = tkcPendent;
    this.items[3].qtyItem = tkcSolved;

    return this.items;
  }

  newTicket() {
    this.router.navigate(['/ticket-new']);
  }

  getStatusClass(status: number) {

    if (status === 1) {
      return 'aberto';
    }

    if (status === 2) {
      return 'resolvido';
    }

    if (status === 3) {
      return 'pendente';
    }

    if (status === 4) {
      return 'excluido';
    }

    return '';
  }

  getStatusName(status: number) {

    if (status === 1) {
      return 'Aberto';
    }

    if (status === 2) {
      return 'Resolvido';
    }

    if (status === 3) {
      return 'Pendente';
    }

    if (status === 4) {
      return 'Excluído';
    }

    return '';
  }

  getPriorityClass(priority: number) {

    if (priority === 1) {
      return 'baixo';
    }

    if (priority === 2) {
      return 'medio';
    }

    if (priority === 3) {
      return 'alto';
    }

    if (priority === 4) {
      return 'urgente'
    }

    return '';
  }

  listTicket() {
    this.loading = true;
    let resolveFunctions = {
      next: (val: any) => {

        this.ticketDetailBkup = val;

        this.ticketDetail = val;

        if (this.ticketDetail.length > 0) {
          this.loading = false;
        }

        if (this.ticketDetail.length === 0) {
          this.loading = false;
          this.showCup = true;
        }
      },
      error: (_err: Error) => {

      }
    }

    this.getListTicket.execute().subscribe(resolveFunctions);
  }

  editTicket(id: number) {
    this.router.navigate(['/ticket-edit'], { state: { data: { ticketId: id } } });
  }

  deleteTicketModal(i: number, tkId: number) {
    this.showGlobalModal.open('delete-ticket', { idArr: i, ticketId: tkId })
  }

  deleteTicket(el: any) {
    let index = el.data[0].idArr;
    let ticketId = el.data[0].ticketId;

    this.deleteWithStatusTicketId.execute(ticketId).subscribe(e => {
      this.listTicket();

      if (this.ticketDetail.length === 0) {
        this.showCup = true;
      }

      this.modalService.dismissAll();
    })
  }

  getPriorityName(val: number) {
    let priorities: any = {
      1: 'Baixo',
      2: 'Médio',
      3: 'Alto',
      4: 'Urgente'
    }

    return priorities[val];
  }

  filterListStatus(val: any, i: number) {
    if(i === 0){
      this.filterToList = '';
      this.ticketDetail = this.ticketDetailBkup;
      return;
    }

    // Marca com true o filtro que foi efetuado o click
    this.items.map((r: any, j: number) => {
      r.selected = false;
      if(this.items[j] === this.items[i]){
        r.selected = true
      }
    })

    let status: any = {
      'Tickets aberto': 1,
      'Tickets pendentes': 3,
      'Tickets resolvidos': 2,
      'Tickets excluídos': 4
    }

    this.filterToList = String(status[val]);
  }

  showMenuFilter(){

    this.menuFilter = !this.menuFilter;

    this.category = [];
    this.requester = [];
    this.personCharge = [];
    this.priority = [];
    this.modelStart = {
      "year": 0,
      "month": 0,
      "day": 0
    }
    this.modelEnd = {
      "year": 0,
      "month": 0,
      "day": 0
    }

    this.ticketDetail = this.ticketDetailBkup;
  }

  getRequestersAll(){
    this.getRequesters.execute().subscribe((r: any) => {
      this.personData = r;
    })
  }

  getResponsiblesAll(){
    this.getResponsibles.execute().subscribe(e => {
      this.responsavel = e;
    })
  }

  getSelectedRequester(evt: any){
    const verifyId = this.requester.some((e:any) => e.id === evt[0].id);

    if(verifyId) return;

    this.requester.push(evt[0]);
  }

  getSelectedPersonCharge(evt: any){
    const verifyId = this.personCharge.some((e:any) => e.id === evt[0].id);

    if(verifyId) return;

    this.personCharge.push(evt[0]);
  }

  getSelectedCategory(evt: any){

    const verifyId = this.category.some((e:any) => e.option === evt[0].option);

    if(verifyId) return;

    this.category.push(evt[0]);
  }

  getSelectedPriority(evt: any){

    const verifyId = this.priority.some((e:any) => e.option === evt[0].option);

    if(verifyId) return;

    this.priority.push(evt[0]);
  }

  reduceName(name: String){
    let ret = name.length > 15 ? '...' : ''
    return name.substring(0, 10)+ret;
  }

  reduceCategoryName(name: String){
    let ret = name.length > 15 ? '...' : ''
    return name.substring(0, 15)+ret;
  }

  resolveIconFilter(evt: string){
    let priority: any = {
      'Baixo': 'ball-color-green',
      'Médio': 'ball-color-blue',
      'Alto': 'ball-color-yellow',
      'Urgente': 'ball-color-red',
      'default': 'ball-color-green'
    };

    return priority[evt];

  }

  removeItem(data: any, i: number){
    data.splice(i, 1)
  }

  apllyFilter(){

    let requester = this.mountData(this.requester);
    let personCharge = this.mountData(this.personCharge);;
    let category = this.mountData(this.category);
    let priority = this.mountData(this.priority);

    let dataInicial = this.modelStart.year !== 0 ? new Date(this.modelStart.year, this.modelStart.month - 1, this.modelStart.day).toISOString().split('T')[0] : null;
    let datafinal = this.modelEnd.year !== 0 ? new Date(this.modelEnd.year, this.modelEnd.month - 1, this.modelEnd.day).toISOString().split('T')[0] : null;

    const params: any = {
      contactId: requester.length !== 0 ? requester : null,
      userId: personCharge.length !== 0 ? personCharge : null,
      category: category.length !== 0 ? category : null,
      priority: priority.length !== 0 ? priority : null,
      createdAtFrom: dataInicial?.length !== 0 ? dataInicial : null,
      createdAtTo: datafinal?.length !== 0 ? datafinal : null
    }

    this.showCup = false;
    this.loading = true;
    this.filter.execute(params).subscribe((r: any) => {
      this.loading = false;

      this.ticketDetail = r;

      if(r.length === 0){
        this.showCup = true;
      }

      if(r.length > 0){
        this.showCup = false;
      }

    })
  }

  mountData(dataMain: any){
    let data = [];
    for(let i = 0; i < dataMain.length; i++){
      let key = dataMain[i].id ? 'id' : 'option';
      data.push(dataMain[i][key])
    }
    return data;
  }

  muntQueryString(arr: any, qry: string){
    let queryString: any = '';
    let rst = '';

    arr.forEach((el: number, i: number) => {
      rst += queryString.concat(`&${qry}=`, arr[i])
    });

    return rst;
  }

  closeWithOutChangeLisFilter(){
    this.menuFilter = !this.menuFilter;
  }

  formatDate(dta: Date){
    return new Date(dta).toLocaleString().split(',')[0];
  }

}
