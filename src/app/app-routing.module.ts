import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'home', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule ), data: { title: "Home" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },{
    path: 'ticket', component: TicketListComponent, data: { title: "Ticket" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'ticket-new', loadChildren: () => import('./pages/ticket/ticket.module').then((m) => m.TicketModule), data: { title: "Novo Ticket" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'ticket-edit', loadChildren: () => import('./pages/ticket-edit/ticket-edit.module').then((m) => m.TicketEditModule), data: { title: "Editar Ticket" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then((m) => m.ContactModule ), data: { title: "Contatos" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },{
    path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then((m) => m.ChatModule ), data: { title: "Chat" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'company', loadChildren: () => import('./pages/company/company.module').then( (m) => m.CompanyModule ), data: { title: "Empresas" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'user', loadChildren: () => import('./pages/user/user.module').then( (m) => m.UserModule ),  data: { title: "Agentes" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'whatsapp', loadChildren: () => import('./pages/whatsapp/whatsapp.module').then( (m) => m.WhatsappModule ), data: { title: "WhatsApp" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'number-whatsapp', loadChildren: () => import('./pages/number-whatsapp/number-whatsapp.module').then(m => m.NumberWhatsappModule), data: { title: "Grupos" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  { 
    path: 'chat-bot', loadChildren: () => import('./pages/chat-bot/chat-bot.module').then(m => m.ChatBotModule), data: { title: "Chatbot" }, canActivate: [AuthGuard], canLoad: [AuthGuard] 
  },
  { 
    path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: "DashBoard" }, canActivate: [AuthGuard], canLoad: [AuthGuard] 
  },
  {
    path: 'teams', loadChildren: () => import('./pages/teams/teams.module').then(m => m.TeamsModule), data: { title: "Equipes" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'category', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule), data: { title: "Categoria" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: 'quick-answers', loadChildren: () => import('./pages/quick-answers/quick-answers.module').then(m => m.QuickAnswersModule), data: { title: "Respostas rápidas" }, canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  { path: 'tag', loadChildren: () => import('./pages/tag/tag.module').then(m => m.TagModule), data: { title: "Tags" }, canActivate: [AuthGuard], canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
