import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'gb-drop-down-contact-chatbot',
  templateUrl: './drop-down-contact-chatbot.component.html',
  styleUrls: ['./drop-down-contact-chatbot.component.scss'],

})
export class DropDownContactChatBotComponent implements OnInit {
  hearContactArrive = new Subject<any>();
  @Input() set name(valor: string) {
    this._name = valor;
  }
  @Input() disabledDrop!: boolean;

  @Input() set dataMessageWhatsappGroup(val: any){
   this.dataMessageWhatsapp = val;

    this.hearContactArrive.next(val);
  }

  @Input() set deleteItem(val: any) {
    this.objectBadgeContact.splice(this.objectBadgeContact.indexOf(val), 1);
      console.log(this.objectBadgeContact)
      let element = document.getElementById(val.id.toString()) as HTMLInputElement;
      element.checked = false;
      this.elementCheckAll.checked = false;
  }

  dataMessageWhatsapp: any[] = [{
    id: 0,
    name: '',
    type: '',
    message: '',
    companyId: 0,
    selected: true,
  }];

  @Input() set selectMessageWhatsapp(index: any){
    this.hearContactArrive.subscribe(dt => {

        this.dataMessageWhatsapp.forEach(e => {
          e.selected = false;
          if(e.id === index){
            e.selected = true;
          }
        })
    })
  }

  @Output() outDropDownDataMessageWhatsapp = new EventEmitter<any>();

  _name: string = '';
  searchTerm: string = '';
  isCollapsed: boolean = true;
  public objContacts = [];
  public elementCheckAll!: any;
  public objectBadgeContact: any = [];
  public inputObjectContact: any = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    window.addEventListener('DELETE_ITEM', ()=> {

    });
  }

  ngOnInit(): void {

    this.elementCheckAll = this.getElementCheckAll();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  openCloseDropDown(){
    this.isCollapsed = !this.isCollapsed;
  }



  selectOption(index: number){
    if(this.dataMessageWhatsapp){
      this.dataMessageWhatsapp[index].selected = true;

      this.dataMessageWhatsapp.forEach((e, i) => {
        if(this.dataMessageWhatsapp[i] !== this.dataMessageWhatsapp[index]){
          e.selected = false;
        }
      })

      //this.isCollapsed = !this.isCollapsed;

      let selectedMessagesWhatsapp = this.dataMessageWhatsapp.filter(e => e.selected);
      //this.outDropDownDataMessageWhatsapp.emit(selectedMessagesWhatsapp);

    }
  }

  verifyOutSideClick(evt: any){
    if (evt.ots) this.isCollapsed = true;
  }

  selectNameMessageWhatsapp(){
    /*let MessageWhatsappName = this.dataMessageWhatsapp.filter(e => e.selected).length > 0 ? this.dataMessageWhatsapp.filter(e => e.selected)[0].name : null;
    if(MessageWhatsappName) return { name: MessageWhatsappName, selected: true};*/

    return { name: 'Selecionar um ou mais contatos', selected: false};
  }

  checked(idx: any, data?: any) {
    if(idx === 'all') {
      this.selectCheckAll();
      return;
    }

    this.selectedCheck(idx, data);
  }

  selectCheckAll() {
    this.dataMessageWhatsapp.map((item: any, index: number) => {
     let element = document.getElementById(item.id.toString()) as HTMLInputElement;
     if(!this.elementCheckAll.checked && typeof(element.checked) !== 'undefined') {
      this.objectBadgeContact = [];
      element.checked = false;

      this.outDropDownDataMessageWhatsapp.emit(this.objectBadgeContact);
      return;
     }

     if(this.elementCheckAll.checked && typeof(element.checked) !== 'undefined') {
      if(index <100) {
        this.objectBadgeContact.push(item);
        element.checked = true;
        this.objectBadgeContact = this.objectBadgeContact
        .filter((result: any, i: any) => this.objectBadgeContact.indexOf(result) === i);

        this.outDropDownDataMessageWhatsapp.emit(this.objectBadgeContact);
      }
    }});
  }

  selectedCheck(idx:number, data: any) {
   let element = document.getElementById(data.id.toString()) as HTMLInputElement;
   if(!element.checked) {
    this.objectBadgeContact.splice(this.objectBadgeContact.indexOf(data), 1);
    element.checked = false;
    this.elementCheckAll.checked = false;

    this.outDropDownDataMessageWhatsapp.emit(this.objectBadgeContact);
    return;
   }

   if(element.checked) {
    this.objectBadgeContact.push(data);
    element.checked = true;
    this.objectBadgeContact.length === 100 ? this.elementCheckAll.checked = true : '';

    this.outDropDownDataMessageWhatsapp.emit(this.objectBadgeContact);
   }
  }

  getElementCheckAll() {
    return document.getElementById('checkAll') as HTMLInputElement;
  }
}
