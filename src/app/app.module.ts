import { CategoryModule } from './pages/category/category.module';
import { TeamsModule } from './pages/teams/teams.module';
import { WhatsappModule } from './pages/whatsapp/whatsapp.module';
import { AuthGuard } from './core/guards/auth.guard';
import { DataModule } from './core/data/data.module';
import { NumberWhatsappModule } from './pages/number-whatsapp/number-whatsapp.module';
import { ContactModule } from './pages/contact/contact.module';
import { CompanyModule } from './pages/company/company.module';
import { TopBarComponent } from 'src/app/components/top-bar/top-bar.component';
import { SidemenuComponent } from 'src/app/components/side-menu/side-menu.component';
import { AuthModule } from 'src/app/pages/auth/auth.module';
import { UserModule } from 'src/app/pages/user/user.module';
import { TicketModule } from 'src/app/pages/ticket/ticket.module';
import { HomeModule } from 'src/app/pages/home/home.module';
import { SharedModule } from './components/shared.module';
import { JWTInterceptor } from './core/interceptor/jwt.interceptor';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './pages/chat/chat.module';
import { ConfigurationModule } from './pages/configuration/configuration.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GetRquesterRepositorie } from './core/repositories/requester/requester.repositorie';
import { RequesterDataRepository } from './core/data/repository/requester/requester.repository';
import { GetResponsibleRepositorie } from './core/repositories/responsible/responsible.repositorie';
import { ResponsiblesDataRepository } from './core/data/repository/responsible/responsible.repository';
import { TicketRepositorie } from './core/repositories/ticket/ticket.repositorie';
import { SaveTicketDataRepository } from './core/data/repository/ticket/ticket.repository';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { TicketEditModule } from './pages/ticket-edit/ticket-edit.module';
import { ChatBotModule } from './pages/chat-bot/chat-bot.module';
import { QuickAnswersModule } from './pages/quick-answers/quick-answers.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NgChartsModule } from 'ng2-charts';
import { TagModule } from './pages/tag/tag.module';
registerLocaleData(localePT);



@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChatModule,
    ConfigurationModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    CommonModule,
    FormsModule,
    HomeModule,
    TicketModule,
    TicketEditModule,
    UserModule,
    AuthModule,
    CompanyModule,
    ContactModule,
    NumberWhatsappModule,
    DataModule,
    WhatsappModule,
    ChatBotModule,
    DashboardModule,
    NgChartsModule,
    TeamsModule,
    CategoryModule,
    QuickAnswersModule,
    TagModule
  ],
  providers: [
    {provide: GetRquesterRepositorie, useClass: RequesterDataRepository},
    {provide: GetResponsibleRepositorie, useClass: ResponsiblesDataRepository},
    {provide: TicketRepositorie, useClass: SaveTicketDataRepository},
    { provide: LOCALE_ID, useValue: 'pt-br' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
