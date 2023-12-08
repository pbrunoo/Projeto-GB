import { NgbInputDatepicker, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as Util from 'src/app/shared/util-common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatBotMessagesUseCase } from 'src/app/core/usecase/chatbot/schedule/schedule-chatbot-messages.usecase';
import { ContactUseCase } from 'src/app/core/usecase/contact/contact.usecase';
import { Observable, Subject } from 'rxjs';
import { ChatBotMessagesTemplateUseCase } from 'src/app/core/usecase/chatbot/schedule/schedule-chatbot-messagesAll.usecase';
import { SaveMessageSend } from 'src/app/core/model/chatbot/chatbot-schedule.model';
import { UpdateChatBotMessagesTemplateUseCase } from 'src/app/core/usecase/chatbot/schedule/schedule-chatbot-msgschedule-update.usecase';

@Component({
  selector: 'gb-modal-chatbot-schedule-editview',
  templateUrl: './modal-chatbot-schedule-editview-component.html',
  styleUrls: ['./modal-chatbot-schedule-editview-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalChatBotScheduleEditViewComponent implements OnInit {

  public typeConfirm: string = 'Salvar ticket?';
  public messageConfirm: string = 'Após a confirmação o ticket será emitido e as respostas não poderão ser excluídas.';
  public buttonName = 'Salvar';
  timeToDate = '00:00';
  timeToDate2 =  '00:00';
  verifyEnableTemplateMessage = false;
  action = new Observable<string>();
  saving: boolean = false;

  @ViewChild('content', { static: true }) content!: HTMLElement;
  @Output() actionData = new EventEmitter<any>();
  @ViewChild('d') d!: NgbInputDatepicker;

  verifyFieldTime: boolean = true;
  messagesTemplate: any = [];
  contactsList = [];
  modalOpenData: any = [];
  userSelected: Observable<number> = new Observable<number>();
  requiredValidator = Validators.required;

  //Fields error
  titleError: any;
  dataEnvioError: any;
  horaEnvioError: any;
  contatoError: any;
  dataEnvioRepetirError: any;
  modeloMensagemError: any;

  scheduleMessageForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    dataAgendamento: ['', Validators.required],
    tempoAgendamento: ['', Validators.required],
    contacts: [null, Validators.required],
    dataAgendamentoRepetir: [],
    tempoAgendamentoRepetir: [],
    checkUseMessageTemplate: [false],
    repetirEnvio: [false],
    messageTemplate: [],
    textMessage: []
  })

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private getAllMessage: ChatBotMessagesUseCase,
    private getAllMessageTemplates: ChatBotMessagesTemplateUseCase,
    private contacts: ContactUseCase,
    private updateMessage: UpdateChatBotMessagesTemplateUseCase){
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open(type: string, data?: any, action: string = 'edit') {

    if(action === 'view') this.scheduleMessageForm.disable();
    if(action === 'edit') this.scheduleMessageForm.enable();

    this.action = new Observable<string>(e => e.next(action));

    this.typeExclusionFunction(type);
    this.modalOpenData = data;

    this.getAllMessageTemplates.execute().subscribe((e: any) => {
    
      let mapper = e.map((f: any) => {
        return {
          ...f,
          selected: false
        }
      })

      mapper.forEach((e: any) => {
        if(e.id === this.modalOpenData.messageTemplateId){
          e.selected = true;
        }
      })

      let initialMessageInForm = mapper.filter((g: any) => g.selected)[0];
      this.scheduleMessageForm.controls['messageTemplate'].setValue(initialMessageInForm);

      this.messagesTemplate = mapper;
    })

    let formatTime = new Date(this.modalOpenData.sendDate).toLocaleTimeString().split(':');
    let formatTimeRepeat = new Date(this.modalOpenData.repeatSendDate).toLocaleTimeString().split(':');

    // Seta valor no titulo
    this.scheduleMessageForm.controls['titulo'].setValue(this.modalOpenData.title);

    // Seta valor no contato
    this.contacts.execute().subscribe((e: any) => {

      let mapper = e.map((f: any) => {
        return {
          ...f,
          selected: false
        }
      })

      mapper.forEach((el: any) => {
        if (el.id === this.modalOpenData.contactId) {
          el.selected = true;
        }
      });

      let initialContactInForm = mapper.filter((g: any) => g.selected)[0];
      this.scheduleMessageForm.controls['contacts'].setValue(initialContactInForm);

      this.contactsList = mapper;
    })

    //Seta valor no campo data agendamento    
    this.scheduleMessageForm.controls['dataAgendamento'].setValue({ year: Number(this.modalOpenData.sendDate.split('-')[0]), month: Number(this.modalOpenData.sendDate.split('-')[1]), day: Number(this.modalOpenData.sendDate.split('-')[2].slice(0, 2)) });

    // Seta valor no campo tempo do agendamento
    this.scheduleMessageForm.controls['tempoAgendamento'].setValue(`${formatTime[0]} : ${formatTime[1]}`);

    // Verifica se o checkbox "repetir envio?" está true. Em caso positivo atribui valor ao campo
    if (this.modalOpenData.repeatSendDate) {
      this.scheduleMessageForm.controls['repetirEnvio'].setValue(true);
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].setValue({ year: Number(this.modalOpenData.repeatSendDate.split('-')[0]), month: Number(this.modalOpenData.repeatSendDate.split('-')[1]), day: Number(this.modalOpenData.repeatSendDate.split('-')[2].slice(0, 2)) });
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].setValue(`${formatTimeRepeat[0]} : ${formatTimeRepeat[1]}`);
    }

    if (!this.modalOpenData.repeatSendDate) {
      this.scheduleMessageForm.controls['repetirEnvio'].setValue(false);
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].setValue(null);
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].setValue(null);
    }

    // Verificar se há template na mensagem
    if (this.modalOpenData.messageTemplateId) {
      this.scheduleMessageForm.controls['checkUseMessageTemplate'].setValue(true);
      this.verifyEnableTemplateMessage = true;
    }

    if (!this.modalOpenData.messageTemplateId) {
      this.scheduleMessageForm.controls['checkUseMessageTemplate'].setValue(false);
      this.verifyEnableTemplateMessage = false;
    }

    // Seta valor no campo mensagem
    if(this.modalOpenData.message){
      this.scheduleMessageForm.controls['textMessage'].setValue(this.modalOpenData.message);
    }

    if(!this.modalOpenData.message){
      this.scheduleMessageForm.controls['textMessage'].setValue(null);
    }

    this.checkUseMessageTemplate();
    this.checkUseRepeatSend();

    this.modalService.open(this.content, { centered: true, windowClass: "myCustomModalClass" });
  }

  typeExclusionFunction(type: string) {
    switch (type) {
      case 'ticket':
        this.buttonName = 'Salvar';
        this.messageConfirm = 'Após a confirmação o ticket será emitido e as respostas não poderão ser excluídas.';
        break;
      case 'logout':
        this.buttonName = 'Logout';
        this.typeConfirm = 'Deseja sair do sistema?';
        this.messageConfirm = '';
        break;
    }
  }

  salvar(asa: any) {
    if (this.buttonName === 'Logout') {
      Util.logout();
      return;
    }
    this.actionData.emit();
  }

  onDateSelected() {
    if (this.timeToDate !== '00:00') this.scheduleMessageForm.controls['tempoAgendamento']?.setValue(`${this.timeToDate}`);

    if (this.timeToDate !== '00:00' && this.scheduleMessageForm.controls['tempoAgendamento']?.valid) {
      this.verifyFieldTime = true;
      return;
    }
    this.verifyFieldTime = false;
  }

  onDateSelected2() {
    if (this.timeToDate2 !== '00:00') this.scheduleMessageForm.controls['tempoAgendamentoRepetir']?.setValue(`${this.timeToDate2}`);

    if (this.timeToDate2 !== '00:00' && this.scheduleMessageForm.controls['tempoAgendamentoRepetir']?.valid) {
      return;
    }
  }

  setValidatorInField(evt: boolean) {
    if (evt) {
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].setValidators([Validators.required]);
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].updateValueAndValidity();
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].setValidators([Validators.required]);
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].updateValueAndValidity();
      return;
    }
    this.scheduleMessageForm.controls['dataAgendamentoRepetir'].clearValidators();
    this.scheduleMessageForm.controls['dataAgendamentoRepetir'].removeValidators(this.requiredValidator);
    this.scheduleMessageForm.controls['dataAgendamentoRepetir'].setValue('');
    this.scheduleMessageForm.controls['dataAgendamentoRepetir'].updateValueAndValidity();

    this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].removeValidators(this.requiredValidator);
    this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].clearValidators();
    this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].setValue('');
    this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].updateValueAndValidity();
  }

  enableTemplateMessageField(evt: any): void {
    if (evt) {
      this.verifyEnableTemplateMessage = true;
      this.scheduleMessageForm.controls['messageTemplate'].enable();
      this.scheduleMessageForm.controls['messageTemplate'].setValidators([Validators.required]);
      this.scheduleMessageForm.controls['messageTemplate'].updateValueAndValidity();

      this.scheduleMessageForm.controls['textMessage'].clearValidators();
      this.scheduleMessageForm.controls['textMessage'].setValue(null);
      this.scheduleMessageForm.controls['textMessage'].updateValueAndValidity();
      return;
    }

    this.verifyEnableTemplateMessage = false;
    this.scheduleMessageForm.controls['messageTemplate'].clearValidators();
    this.scheduleMessageForm.controls['messageTemplate'].setErrors(null);
    this.scheduleMessageForm.controls['messageTemplate'].updateValueAndValidity();
    this.scheduleMessageForm.controls['messageTemplate'].disable();
    //this.scheduleMessageForm.controls['messageTemplate'].reset();

    this.scheduleMessageForm.controls['textMessage'].setValidators([Validators.required]);
    this.scheduleMessageForm.controls['textMessage'].updateValueAndValidity();
  }

  saveData() {

    let validForm = this.scheduleMessageForm.valid;

    Object.keys(this.scheduleMessageForm.controls).forEach(field => {
      const controle: any = this.scheduleMessageForm.get(field);
      if (controle.status === 'INVALID') {
        controle.markAsTouched({ onlySelf: true })
      } 
    });

    if(validForm){
      let explodeHourSchedule = this.scheduleMessageForm.controls['tempoAgendamento'].value.split(':');
      let explodeHourScheduleRepeat = this.scheduleMessageForm.controls['repetirEnvio'].value ? this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].value.split(':') : null;     
      let getSeconds = new Date().getSeconds();

      let convDate = new Date(this.scheduleMessageForm.controls['dataAgendamento'].value.year, this.scheduleMessageForm.controls['dataAgendamento'].value.month - 1, this.scheduleMessageForm.controls['dataAgendamento'].value.day, Number(explodeHourSchedule[0]), Number(explodeHourSchedule[1]), getSeconds).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(',');
      let formatIsoSendDate = `${convDate[0].split('/')[2]}-${convDate[0].split('/')[1]}-${convDate[0].split('/')[0]}T${convDate[1].split(':')[0].trim()}:${convDate[1].split(':')[1]}:${convDate[1].split(':')[2]}.000Z`;

      let convDateRepeat: any = this.scheduleMessageForm.controls['repetirEnvio'].value ? new Date(this.scheduleMessageForm.controls['dataAgendamentoRepetir'].value.year, this.scheduleMessageForm.controls['dataAgendamentoRepetir'].value.month - 1, this.scheduleMessageForm.controls['dataAgendamentoRepetir'].value.day, Number(explodeHourScheduleRepeat[0]), Number(explodeHourScheduleRepeat[1]), getSeconds).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(',') : null;
      let formatIsoSendDateRepeat = convDateRepeat ? `${convDateRepeat[0].split('/')[2]}-${convDateRepeat[0].split('/')[1]}-${convDateRepeat[0].split('/')[0]}T${convDateRepeat[1].split(':')[0].trim()}:${convDateRepeat[1].split(':')[1]}:${convDateRepeat[1].split(':')[2]}.000Z` : null;
      
      let objParam: SaveMessageSend = {
        id: this.modalOpenData.id,
        title: this.scheduleMessageForm.controls['titulo'].value,
        message: !this.scheduleMessageForm.controls['checkUseMessageTemplate'].value ? this.scheduleMessageForm.controls['textMessage'].value : null,
        sendDate: formatIsoSendDate,
        repeatSendDate: formatIsoSendDateRepeat,
        messageTemplateId: this.scheduleMessageForm.controls['messageTemplate'].value ? this.scheduleMessageForm.controls['messageTemplate'].value.id : null,
        contactId: this.scheduleMessageForm.controls['contacts'].value.id,
      }

      this.saving = true;

      this.updateMessage.execute(objParam).subscribe((r: any) => {
        if(r.status === 200){
          this.saving = false;
          this.actionData.emit(true);
          this.modalService.dismissAll();
        }
      })

    }
  }

  editar(){
    this.action = new Observable<string>(e => e.next('edit'));

    this.scheduleMessageForm.controls['titulo'].enable();
    this.scheduleMessageForm.controls['dataAgendamento'].enable();
    this.scheduleMessageForm.controls['tempoAgendamento'].enable();
    this.scheduleMessageForm.controls['contacts'].enable();
    this.scheduleMessageForm.controls['repetirEnvio'].enable();
    this.scheduleMessageForm.controls['checkUseMessageTemplate'].enable();

    if(this.scheduleMessageForm.controls['repetirEnvio'].value){
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].enable();
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].enable();
    }

    if(this.scheduleMessageForm.controls['checkUseMessageTemplate'].value){
      this.scheduleMessageForm.controls['messageTemplate'].enable();
    }

    if(!this.scheduleMessageForm.controls['checkUseMessageTemplate'].value){
      this.scheduleMessageForm.controls['textMessage'].enable();
    }
  
  }

  checkUseMessageTemplate(){

    if(!this.scheduleMessageForm.controls['checkUseMessageTemplate'].value){
      this.verifyEnableTemplateMessage = true;
      this.scheduleMessageForm.controls['textMessage'].setValidators([Validators.required]);
      this.scheduleMessageForm.controls['textMessage'].updateValueAndValidity();

      this.scheduleMessageForm.controls['messageTemplate'].setValue(null);
      this.scheduleMessageForm.controls['messageTemplate'].updateValueAndValidity();
      this.scheduleMessageForm.controls['messageTemplate'].clearValidators();
      this.scheduleMessageForm.controls['messageTemplate'].updateValueAndValidity();
    }

    if(this.scheduleMessageForm.controls['checkUseMessageTemplate'].value){
      this.verifyEnableTemplateMessage = true;
      this.scheduleMessageForm.controls['messageTemplate'].setValidators([Validators.required]);
      this.scheduleMessageForm.controls['messageTemplate'].updateValueAndValidity();

      this.scheduleMessageForm.controls['textMessage'].clearValidators();
      this.scheduleMessageForm.controls['textMessage'].setValue(null);
      this.scheduleMessageForm.controls['textMessage'].updateValueAndValidity();
    }
  }

  checkUseRepeatSend(){
    if(this.scheduleMessageForm.controls['repetirEnvio'].value){      
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].setValidators([Validators.required]);
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].updateValueAndValidity();

      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].setValidators([Validators.required]);
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].updateValueAndValidity();
    }

    if(!this.scheduleMessageForm.controls['repetirEnvio'].value){      
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].clearValidators();
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].setValue(null);
      this.scheduleMessageForm.controls['dataAgendamentoRepetir'].updateValueAndValidity();
      
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].clearValidators();
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].setValue(null);
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].updateValueAndValidity();
    }
  }

  resetForm(){
    this.scheduleMessageForm.controls['textMessage'].setValue(null)
  }








}
