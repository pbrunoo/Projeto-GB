import { ModalProfileComponent } from './modal-profile/modal-profile.component';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { DropDownMessageWhatsappComponent } from './drop-down-message-whatsapp/drop-down-message-whatsapp.component';
import { ModalTeamsComponent } from './modal-teams/modal-teams.component';
import { NewCompanySixComponent } from './new-company-six/new-company-six.component';
import { NewCompanyFiveComponent } from './new-company-five/new-company-five.component';
import { NewCompanyFourComponent } from './new-company-four/new-company-three.component';
import { NewCompanyThreeComponent } from './new-company-three/new-company-three.component';
import { NewCompanyTwoComponent } from './new-company-two/new-company-two.component';
import { NewCompanyOneComponent } from './new-company-one/new-company-one.component';
import { NewContactSixComponent } from './new-contact-six/new-contact-six.component';
import { NewContactFiveComponent } from './new-contact-five/new-contact-five.component';
import { NewContactFourComponent } from './new-contact-four/new-contact-four.component';
import { NewContactThreeComponent } from './new-contact-three/new-contact-three.component';
import { NewContactTwoComponent } from './new-contact-two/new-contact-two.component';
import { NewContactOneComponent } from './new-contact-one/new-contact-one.component';
import { DropDownTeansComponent } from './drop-down-teans/drop-down-teans.component';
import { ModalNumberWhatsappComponent } from './modal-number-whatsapp/modal-number-whatsapp.component';
import { ModalBotsModelMessageComponent } from './modal-bots-model-message/modal-bots-model-message.component';
import { BotsModelMessageComponent } from './bots-model-message/bots-model-message.component';
import { DropDownGreetingComponent } from './drop-down-greeting/drop-down-greeting.component';
import { ModalBotsGreetingComponent } from './modal-bots-greetings/modal-bots-greeting.component';
import { NovoTicketUmComponent } from './novo-ticket-um/novo-ticket-um.component';
import { NovoTicketSeisComponent } from './novo-ticket-seis/novo-ticket-seis.component';
import { NovoTicketCincoComponent } from './novo-ticket-cinco/novo-ticket-cinco.component';
import { NovoTicketQuatroComponent } from './novo-ticket-quatro/novo-ticket-quatro.component';
import { NovoTicketTresComponent } from './novo-ticket-tres/novo-ticket-tres.component';
import { RouterModule } from '@angular/router';
import { ModalQrCodeComponent } from './modal-qr-code/modal-qr-code.component';
import { DropDownContactCompany } from './drop-down-contact-company/drop-down-contact-company.component';
import { StatusDropDownWhatsappComponent } from './status-drop-down-whatsapp/status-drop-down-whatsapp.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { ModalContactComponent } from './modal-contact/modal-contact.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbTimeAdapter, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusDropDownComponent } from './status-drop-down/status-drop-down.component';
import { OutsideClickDirective } from '../behavior/directives/outside-click.directive';
import { DropDownSearchPersonComponent } from './drop-down-search-person/drop-down-search-person.component';
import { FilterListPersonPipe } from '../behavior/pipes/filter-list-person.pipe';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { DropDownGroupComponent } from './drop-down-group/drop-down-group.component';
import { ChangeDropDownBorderColorDirective } from '../behavior/directives/change-drop-down-border-color.directive';
import { LoginComponent } from './login/login.component';
import { RememberPasswordComponent } from './remember-password/remember-password.component';
import { ModalCompanyComponent } from './modal-company/modal-company.component';
import { HeadersPageComponent } from './headers-page/headers-page.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { DropDownContactWhatsapp } from './drop-down-contact-whatsapp/drop-down-contact-whatsapp.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { FilterListTicketPipe } from '../behavior/pipes/list-ticket-subjectsearch.pipe';
import { LoaderComponent } from './loader/loader.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ModalGlobalComponent } from './global-modal/global-modal.component';
import { ModalTransferComponent } from './modal-transfer/modal-transfer.component';
import { BotsComponent } from './bots/bots.component';
import { MenuConfigurationComponent } from './menu-configuration/menu-configuration.component';
import { ModalChatBotScheduleComponent } from './modal-chatbot-schedule/modal-chatbot-schedule-component';
import { NovoTicketDoisComponent } from './novo-ticket-dois/novo-ticket-dois.component';
import { CustomDatepickerI18n, I18n, NgbDatePTParserFormatter, NgbTimeStringAdapter } from '../shared/util-common';
import { BotsGreetingsComponent } from './bots-greetings/bots-greetings.component';
import { ModalChatBotScheduleEditViewComponent } from './modal-chatbot-schedule-editview/modal-chatbot-schedule-editview-component';
import { SortByPipe } from '../behavior/pipes/order-by.pipe';
import { ModalmodalQuickAnswersComponent } from './modal-quick-answers/modal-quick-answers.component';
import { DropDownTeamComponent } from './drop-down-team/drop-down-team.component';
import { DropDownPeriodDateComponent } from './drop-down-period-date/drop-down-period-date.component';
import { DropDownContactChatBotComponent } from './drop-down-contact-chatbot/drop-down-contact-chatbot.component';
import { ModalImportContactComponent } from './modal-import-contacts/modal-import-contact.component';
import { MaskToNgDatapicketFieldDirective } from "../behavior/directives/mask-to-ng-datapicket-field.directive";
import { InputAnswareModule } from './input-answare/input-answare.module';
import { GlobalHeaderIntoComponent } from './global-header-into/global-header-into.component';
import { ModalTagComponent } from './modal-tag/modal-tag.component';
import { WhatsAppBotComponent } from './whats-app-bot/whats-app-bot.component';



@NgModule({
  declarations: [
    ToastMessageComponent,
    LoginComponent,
    RememberPasswordComponent,
    StatusDropDownComponent,
    OutsideClickDirective,
    DropDownSearchPersonComponent,
    FilterListPersonPipe,
    FilterListTicketPipe,
    ToastMessageComponent,
    DropDownGroupComponent,
    ChangeDropDownBorderColorDirective,
    HeadersPageComponent,
    ModalCompanyComponent,
    FooterComponent,
    ModalDeleteComponent,
    ModalContactComponent,
    ModalUserComponent,
    DropDownContactWhatsapp,
    StatusDropDownWhatsappComponent,
    ModalConfirmComponent,
    TicketListComponent,
    DropDownContactCompany,
    LoaderComponent,
    ModalGlobalComponent,
    ModalQrCodeComponent,
    MenuConfigurationComponent,
    NovoTicketDoisComponent,
    NovoTicketTresComponent,
    NovoTicketQuatroComponent,
    NovoTicketCincoComponent,
    NovoTicketSeisComponent,
    NovoTicketUmComponent,
    ModalTransferComponent,
    BotsComponent,
    MenuConfigurationComponent,
    ModalChatBotScheduleComponent,
    BotsGreetingsComponent,
    ModalBotsGreetingComponent,
    DropDownGreetingComponent,
    ModalChatBotScheduleEditViewComponent,
    BotsModelMessageComponent,
    ModalBotsModelMessageComponent,
    SortByPipe,
    ModalNumberWhatsappComponent,
    DropDownTeansComponent,
    NewContactOneComponent,
    NewContactTwoComponent,
    NewContactThreeComponent,
    NewContactFourComponent,
    NewContactFiveComponent,
    NewContactSixComponent,
    NewCompanyOneComponent,
    NewCompanyTwoComponent,
    NewCompanyThreeComponent,
    NewCompanyFourComponent,
    NewCompanyFiveComponent,
    NewCompanySixComponent,
    DropDownTeamComponent,
    DropDownPeriodDateComponent,
    ModalTeamsComponent,
    DropDownMessageWhatsappComponent,
    ModalCategoryComponent,
    ModalProfileComponent,
    ModalmodalQuickAnswersComponent,
    DropDownContactChatBotComponent,
    ModalImportContactComponent,
    MaskToNgDatapicketFieldDirective,
    GlobalHeaderIntoComponent,
    ModalTagComponent,
    WhatsAppBotComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbAlertModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    }),
    NgbTooltipModule,
    QRCodeModule,
    RouterModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    InputAnswareModule
  ],
  exports: [
    ToastMessageComponent,
    LoginComponent,
    RememberPasswordComponent,
    NgbCollapseModule,
    NgbAlertModule,
    StatusDropDownComponent,
    OutsideClickDirective,
    DropDownSearchPersonComponent,
    ToastMessageComponent,
    HeadersPageComponent,
    DropDownGroupComponent,
    ChangeDropDownBorderColorDirective,
    FooterComponent,
    ModalCompanyComponent,
    ModalDeleteComponent,
    ModalContactComponent,
    ModalUserComponent,
    DropDownContactWhatsapp,
    StatusDropDownWhatsappComponent,
    ModalConfirmComponent,
    TicketListComponent,
    DropDownContactCompany,
    LoaderComponent,
    ModalGlobalComponent,
    ModalQrCodeComponent,
    MenuConfigurationComponent,
    NovoTicketDoisComponent,
    NovoTicketTresComponent,
    NovoTicketQuatroComponent,
    NovoTicketCincoComponent,
    NovoTicketSeisComponent,
    NovoTicketUmComponent,
    ModalTransferComponent,
    BotsComponent,
    MenuConfigurationComponent,
    ModalChatBotScheduleComponent,
    NgbDatepickerModule,
    NgbTimepickerModule,
    BotsGreetingsComponent,
    ModalBotsGreetingComponent,
    DropDownGreetingComponent,
    ModalChatBotScheduleEditViewComponent,
    BotsModelMessageComponent,
    ModalBotsModelMessageComponent,
    ModalNumberWhatsappComponent,
    DropDownTeansComponent,
    NewContactOneComponent,
    NewContactTwoComponent,
    NewContactThreeComponent,
    NewContactFourComponent,
    NewContactFiveComponent,
    NewContactSixComponent,
    NewCompanyOneComponent,
    NewCompanyTwoComponent,
    NewCompanyThreeComponent,
    NewCompanyFourComponent,
    NewCompanyFiveComponent,
    NewCompanySixComponent,
    DropDownTeamComponent,
    DropDownPeriodDateComponent,
    ModalTeamsComponent,
    DropDownMessageWhatsappComponent,
    ModalCategoryComponent,
    ModalProfileComponent,
    ModalmodalQuickAnswersComponent,
    DropDownContactChatBotComponent,
    ModalImportContactComponent,
    MaskToNgDatapicketFieldDirective,
    GlobalHeaderIntoComponent,
    ModalTagComponent,
    WhatsAppBotComponent
  ],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    {provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter},
    { provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }]
})
export class SharedModule { }
