import { NgbInputDatepicker, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as Util from 'src/app/shared/util-common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUseCase } from 'src/app/core/usecase/contact/contact.usecase';
import { ChatBotMessagesTemplateUseCase } from 'src/app/core/usecase/chatbot/schedule/schedule-chatbot-messagesAll.usecase';
import { SaveChatBotMessagesTemplateUseCase } from 'src/app/core/usecase/chatbot/schedule/schedule-chatbot-msgSchedule-save.usecase';
import { SaveMessageSend } from 'src/app/core/model/chatbot/chatbot-schedule.model';
import { NumberWhatsappUserCase } from 'src/app/core/usecase/number-whatsapp/number-whatsapp.usecase';
import { Observable } from 'rxjs';

@Component({
  selector: 'gb-modal-chatbot-schedule',
  templateUrl: './modal-chatbot-schedule-component.html',
  styleUrls: ['./modal-chatbot-schedule-component.scss']
})

export class ModalChatBotScheduleComponent implements OnInit {
  public typeConfirm: string = 'Salvar ticket?';
  public messageConfirm: string = 'Após a confirmação o ticket será emitido e as respostas não poderão ser excluídas.';
  public buttonName = 'Salvar';
  timeToDate = '00:00';
  timeToDate2 = '00:00';
  timeToDateAgendamento = '00:00';
  timeToDateAgendamentoRepetir = '00:00';
  verifyEnableTemplateMessage = false;
  public objWhatsappNumber: any = [];
  public objContactSelected!: any;
  public positionDelete!: number;
  public objectIdContact!: any;

  @ViewChild('content', { static: true }) content!: HTMLElement;
  @Output() actionData = new EventEmitter<any>();
  @ViewChild('d') d!: NgbInputDatepicker;

  verifyFieldTime: boolean = true;
  messagesTemplate: any = [];
  contactsList = [];
  saving: boolean = false;

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
    checkUseMessageTemplate: [true],
    repetirEnvio: [false],
    messageTemplate: [],
    textMessage: [],
    timeToDateAgendamento: [this.timeToDateAgendamento],
    timeToDateAgendamentoRepetir: [this.timeToDateAgendamentoRepetir]
  })

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private getAllMessage: ChatBotMessagesTemplateUseCase,
    private contacts: ContactUseCase,
    private saveMessage: SaveChatBotMessagesTemplateUseCase,
    private numberWhatsappUserCase: NumberWhatsappUserCase
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {

    this.getAllMessage.execute().subscribe((e: any) => {

      let mapper = e;
      mapper.map((e: any) => {
        return {
          ...e,
          selected: false
        }
      })

      this.messagesTemplate = mapper;
    })

    this.contacts.execute().subscribe((e: any) => {

      let mapper = e.map((f: any) => {
        return {
          id: f.id,
          email: f.phone,
          password: '',
          name: f.name,
          type: 1,
          selected: false
        }
      })

      this.contactsList = mapper;
    })

    this.numberWhatsappUserCase.execute()
    .subscribe({
      next: (res: any) => {
        let mapper = res.map((f: any) => {
          return {
            id: f.id,
            name: f.name,
            selected: false
          }
        })
        this.objWhatsappNumber = mapper;
      },
      error: (e) => {console.log(e)}
    });

    // Verificar valor inicial do checkbox usar template
    this.checkUseMessageTemplate();

    this.scheduleMessageForm.controls['timeToDateAgendamento'].valueChanges.subscribe(e => {
      this.scheduleMessageForm.controls['tempoAgendamento'].setValue(e);
    })

    this.scheduleMessageForm.controls['timeToDateAgendamentoRepetir'].valueChanges.subscribe(e => {
      this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].setValue(e);
    })

  }

  open(type: string, data?: any) {
    this.typeExclusionFunction(type);
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
    this.scheduleMessageForm.controls['dataAgendamentoRepetir'].setValue('');
    this.scheduleMessageForm.controls['dataAgendamentoRepetir'].updateValueAndValidity();
    this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].clearValidators();
    this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].setValue('');
    this.scheduleMessageForm.controls['tempoAgendamentoRepetir'].updateValueAndValidity();
  }

  enableTemplateMessageField(evt: any): void {
    if (evt) {
      this.verifyEnableTemplateMessage = true;
      this.scheduleMessageForm.controls['messageTemplate'].setValidators([Validators.required]);
      this.scheduleMessageForm.controls['messageTemplate'].updateValueAndValidity();

      this.scheduleMessageForm.controls['textMessage'].clearValidators();
      this.scheduleMessageForm.controls['textMessage'].setValue(null);
      this.scheduleMessageForm.controls['textMessage'].updateValueAndValidity();
      return;
    }
    this.verifyEnableTemplateMessage = false;
    this.scheduleMessageForm.controls['messageTemplate'].clearValidators();
    this.scheduleMessageForm.controls['messageTemplate'].setValue(null);
    this.scheduleMessageForm.controls['messageTemplate'].updateValueAndValidity();

    this.scheduleMessageForm.controls['textMessage'].setValidators([Validators.required]);
    this.scheduleMessageForm.controls['textMessage'].updateValueAndValidity();
  }

  saveData() {
    let validForm = this.scheduleMessageForm.valid;

    Object.keys(this.scheduleMessageForm.controls).forEach(field => {
      const controle: any = this.scheduleMessageForm.get(field);
      if(controle.status === 'INVALID'){
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
        title: this.scheduleMessageForm.controls['titulo'].value,
        message: !this.scheduleMessageForm.controls['checkUseMessageTemplate'].value ? this.scheduleMessageForm.controls['textMessage'].value : null,
        sendDate: formatIsoSendDate,
        repeatSendDate: formatIsoSendDateRepeat,
        messageTemplateId: this.scheduleMessageForm.controls['messageTemplate'].value ? this.scheduleMessageForm.controls['messageTemplate'].value.id : null,
        contactId: this.scheduleMessageForm.controls['contacts'].value.id,
      }

      this.saving = true;
      this.saveMessage.execute(objParam).subscribe((r: any) => {
        if(r.id){
          this.saving = false;
          this.actionData.emit(true);
          this.modalService.dismissAll();
        }
      })

    }
  }

  checkUseMessageTemplate(){
    if(this.scheduleMessageForm.controls['checkUseMessageTemplate'].value){
      this.verifyEnableTemplateMessage = true;
      this.scheduleMessageForm.controls['messageTemplate'].setValidators([Validators.required]);
      this.scheduleMessageForm.controls['messageTemplate'].updateValueAndValidity();
    }
  }

  getSelectNumberWhatsapp(event: any): void {
    this.objContactSelected = event;
  }

  deleteItem(item: any) {
    this.positionDelete = item;
  }

  closeModal() {
    this.objContactSelected = [];
    this.modalService.dismissAll();
  }
}
