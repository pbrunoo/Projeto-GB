import { DeleteCategoryRepository } from './repository/category/delete-category.repository';
import { CreateCategoryRepository } from './repository/category/create-category.repository';
import { CategoryRepository } from './repository/category/category.repository';
import { PatchTeansRepository } from './repository/teans/patch-teans.respository';
import { UpdateTeansRepository } from './repository/teans/update-teans.respository';
import { CreateTeansRepository } from './repository/teans/create-teans.respository';
import { DeleteTeansRepository } from './repository/teans/delete-teans.repository';
import { BotGreetingByIdRepository } from './repository/bots-greeting/bots-greeting-by-id.repository';
import { CreateNumberWhatsappRepository } from './repository/number-whatsapp/create-number-whatsapp.repository';
import { TeansRepository } from './repository/teans/teans.repository';
import { UpdateModelMessageRepository } from './repository/model-message/update-model-message.respository';
import { CreateModelMessagegRepository } from './repository/model-message/create-model-message.respository';
import { PatchModelMessageRepository } from './repository/model-message/patch-model-message.respository';
import { DeleteBotsGreetingRepository } from './repository/bots-greeting/delete-bots-greeting.repository';
import { PatchBotsGreetingRepository } from './repository/bots-greeting/patch-bots-greeting.respository';
import { CreateBotsGreetingRepository } from './repository/bots-greeting/create-bots-greeting.respository';
import { ModelMessageRepository } from './repository/model-message/model-message.repository';
import { BotGreetingRepository } from './repository/bots-greeting/bots-greeting.repository';
import { GetQrCodeRepository } from './repository/whatsapp/get-qr-code.repository';
import { UserSearchRepository } from './repository/user/user-search.repository';
import { UpdateUserRepository } from './repository/user/update-user.repository';
import { CreateUserRepository } from './repository/user/create-user.repository';
import { NumberWhatsappByIdRepository } from './repository/number-whatsapp/number-whatsapp-by-id.repository';
import { DeleteUserRepository } from './repository/user/delete-user.repository';
import { UserAllRepository } from './repository/user/user-all.repository';
import { CompanySearchRepository } from './repository/company/company-search.repository';
import { ContactSearchRepository } from './repository/contacts/contact-search.repository';
import { CompanyByIdRepository } from './repository/company/company-by-id.repository';
import { UpdateContactRepository } from './repository/contacts/update-contact.repository';
import { CreateContactRepository } from './repository/contacts/create-contact.repository';
import { UpdateCompanyRepository } from './repository/company/update-company.respository';
import { CreateCompanyRepository } from './repository/company/create-company.respository';
import { DeleteContactRepository } from './repository/contacts/delete-contact.repository';
import { ContactRepository } from './repository/contacts/contact.repository';
import { DeleteCompanyRepository } from './repository/company/delete-company.repository';
import { CompanyRepository } from './repository/company/company-data.repository';
import { NumberWhatsappRepository } from './repository/number-whatsapp/number-whatsapp-repository';
import { AuthenticationByTokenRepository } from './repository/authentication/autentication-token.repository';
import { GetAuthenticationByTokenRepositories } from 'src/app/core/repositories/authentication/get-authentication-by-token.repositories';
import { AutenticationDataRepository } from './repository/authentication/autentication-data.repository';
import { AuthenticationRepositories } from 'src/app/core/repositories/authentication/authentication.repositories';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NumberWhatsappRepositories } from '../repositories/number-whatsapp/number-whatsapp.repositories';
import { UserRepositorie } from '../repositories/user/user.repositorie';
import { UserDataRepository } from './repository/user/user.repository';
import { CompanyRepositories } from '../repositories/company/company.repositories';
import { DeleteCompanyRepositories } from '../repositories/company/delete-company.repositories';
import { ContactRepositories } from '../repositories/contact/contact.repositories';
import { DeleteContactRepositories } from '../repositories/contact/delete-contact.repositories';
import { CreateCompanyRepositories } from '../repositories/company/create-company.repositories';
import { UpdateCompanyRepositories } from '../repositories/company/update-company.repositories';
import { CreateContactRepositories } from '../repositories/contact/create-contact.repositories';
import { UpdateContactRepositories } from '../repositories/contact/update-contact.repositories';
import { CompanyByIdRepositories } from '../repositories/company/company-by-id.repositories';
import { ContactSearchRepositories } from '../repositories/contact/contact-search.repositories';
import { CompanySearchRepositories } from '../repositories/company/company-search.repositories';
import { UserAllRepositorie } from '../repositories/user/user-all.repositorie';
import { DeleteUserRepositories } from '../repositories/user/delete-user.repositories';
import { NumberWhatsappByIdRepositories } from '../repositories/number-whatsapp/number-whatsapp-by-id.repositories';
import { CreateUserRepositories } from '../repositories/user/create-user.repositories';
import { UpdateUserRepositories } from '../repositories/user/update-user.repositories';
import { UserSearchRepositories } from '../repositories/user/user-search.repositories';
import { GetQrCodeRepositories } from '../repositories/whatsapp/get-qr-code.repositories';
import { ChatBotRepositories } from '../repositories/chatbot/schedule/chat-bot-schedule.repositories';
import { GetMessageDataRepository } from './repository/chatbot/schedule/schedule-chatbot-allmessage.repository';
import { BotsGreetingRepositories } from '../repositories/bots-greeting/bots-greeting.repositories';
import { ModelMessageRepositories } from '../repositories/model-message/model-message.repositories';
import { CreateBotsGreetingRepositories } from '../repositories/bots-greeting/create-bots-greeting.repositories';
import { PatchBotsGreetingRepositories } from '../repositories/bots-greeting/patch-bots-greeting.repositories';
import { DeleteBotsGreetingRepositories } from '../repositories/bots-greeting/delete-bots-greeting.repositories';
import { UpdateBotsGreetingRepositories } from '../repositories/bots-greeting/update-bots-greeting.repositories';
import { UpdateBotsGreetingRepository } from './repository/bots-greeting/update-bots-greeting.respository';
import { DeleteModelMensagemRepository } from './repository/model-message/delete-model-message.repository';
import { PatchModelMessageRepositories } from '../repositories/model-message/patch-model-message.repositories';
import { CreateModelMessageRepositories } from '../repositories/model-message/create-model-message.repositories';
import { UpdateModelMessageRepositories } from '../repositories/model-message/update-model-message.repositories';
import { TeansRepositories } from '../repositories/teans/teans.repositories';
import { CreateNumberWhatsappRepositories } from '../repositories/number-whatsapp/create-number-whatsapp.repositories';
import { DashBoardRepositories } from '../repositories/dashboard/dashboard-data.repositorie';
import { DashboardDataRepository } from './repository/dashboard/dashboard-data.repository';
import { BotsGreetingByIdRepositories } from '../repositories/bots-greeting/bots-greeting-by-id.repositories';
import { DeleteTeansRepositories } from '../repositories/teans/delete-teans.repositories';
import { CreateTeansRepositories } from '../repositories/teans/create-teans.repositories';
import { UpdateTeansRepositories } from '../repositories/teans/update-teans.repositories';
import { PatchTeansRepositories } from '../repositories/teans/patch-teans.repositories';
import { CategoryRepositories } from '../repositories/category/category.repositories';
import { CreateCategoryRepositories } from '../repositories/category/create-category.repositories';
import { DeleteCategoryRepositories } from '../repositories/category/delete-category.repositories';
import { UserByIdRepositories } from '../repositories/user/user-by-id.repositories';
import { UserByIdRepository } from './repository/user/user-by-id.repository';
import { QuickAnswersRepositories } from '../repositories/quick-answers/quick-answers.repositories';
import { QuickAnswersRepository } from './repository/quick-answers/quick-answers-repository';
import { TeamQuickAnswersByIdRepositories } from '../repositories/quick-answers/team-quick-answers-by-id.repositories';
import { TeamQuickAnswersByIdRepository } from './repository/quick-answers/team-quick-answers-by-id-repository';
import { CreateQuickAnswersRepositories } from '../repositories/quick-answers/create-quick-answers.repositories';
import { CreateQuickAnswersRepository } from './repository/quick-answers/create-quick-answers.respository';
import { CreateTeamQuickAnswersRepositories } from '../repositories/quick-answers/create-team-quick-answers.repositories';
import { CreateTeamQuickAnswersRepository } from './repository/quick-answers/create-team-quick-answers.respository';
import { UpdateQuickAnswersRepositories } from '../repositories/quick-answers/update-quick-answers.repositories';
import { UpdateQuickAnswersRepository } from './repository/quick-answers/update-quick-answers.respository';
import { DeleteQuickAnswersRepositories } from '../repositories/quick-answers/delete-quick-answers.repositories';
import { DeleteQuickAnswersRepository } from './repository/quick-answers/delete-quick-answers.repository';
import { GroupRepositories } from '../repositories/group/group.repositorie';
import { GroupDataRepository } from './repository/group/group.repository';


@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: AuthenticationRepositories,
      useClass: AutenticationDataRepository
    },
    {
      provide: GetAuthenticationByTokenRepositories,
      useClass: AuthenticationByTokenRepository
    },
    {
      provide: NumberWhatsappRepositories,
      useClass: NumberWhatsappRepository
    },
    {
      provide: NumberWhatsappByIdRepositories,
      useClass: NumberWhatsappByIdRepository
    },
    {
      provide: CreateNumberWhatsappRepositories,
      useClass: CreateNumberWhatsappRepository
    },
    {
      provide: GetQrCodeRepositories,
      useClass: GetQrCodeRepository
    },
    {
      provide: UserRepositorie,
      useClass: UserDataRepository
    },{
      provide: CreateUserRepositories,
      useClass: CreateUserRepository
    },{
      provide: UpdateUserRepositories,
      useClass: UpdateUserRepository
    },
    {
      provide: DeleteUserRepositories,
      useClass: DeleteUserRepository
    },
    {
      provide: UserAllRepositorie,
      useClass: UserAllRepository
    },
    {
      provide: UserSearchRepositories,
      useClass: UserSearchRepository
    },
    {
      provide: UserByIdRepositories,
      useClass: UserByIdRepository
    },
    {
      provide: CompanyRepositories,
      useClass: CompanyRepository
    },
    {
      provide: DeleteCompanyRepositories,
      useClass: DeleteCompanyRepository
    },
    {
      provide: CreateCompanyRepositories,
      useClass: CreateCompanyRepository
    },{
      provide: UpdateCompanyRepositories,
      useClass: UpdateCompanyRepository
    },
    {
      provide: CompanySearchRepositories,
      useClass: CompanySearchRepository
    },{
      provide: CompanyByIdRepositories,
      useClass: CompanyByIdRepository
    },
    {
      provide: ContactRepositories,
      useClass: ContactRepository
    },
    {
      provide: DeleteContactRepositories,
      useClass: DeleteContactRepository
    },
    {
      provide: CreateContactRepositories,
      useClass: CreateContactRepository
    },
    {
      provide: UpdateContactRepositories,
      useClass: UpdateContactRepository
    },
    {
      provide: ContactSearchRepositories,
      useClass: ContactSearchRepository
    },
    {
      provide: ChatBotRepositories,
      useClass: GetMessageDataRepository
    },
    {
      provide: BotsGreetingRepositories,
      useClass: BotGreetingRepository
    },{
      provide: CreateBotsGreetingRepositories,
      useClass: CreateBotsGreetingRepository
    },{
      provide: PatchBotsGreetingRepositories,
      useClass: PatchBotsGreetingRepository
    },{
      provide: DeleteBotsGreetingRepositories,
      useClass: DeleteBotsGreetingRepository
    },{
      provide: UpdateBotsGreetingRepositories,
      useClass: UpdateBotsGreetingRepository
    },{
      provide: BotsGreetingByIdRepositories,
      useClass: BotGreetingByIdRepository
    },
    {
      provide: ModelMessageRepositories,
      useClass: ModelMessageRepository
    },
    {
      provide: DeleteModelMensagemRepository,
      useClass: DeleteModelMensagemRepository
    },
    {
      provide: PatchModelMessageRepositories,
      useClass: PatchModelMessageRepository
    },
    {
      provide: CreateModelMessageRepositories,
      useClass: CreateModelMessagegRepository
    },
    {
      provide: UpdateModelMessageRepositories,
      useClass: UpdateModelMessageRepository
    },
    {
      provide: TeansRepositories,
      useClass: TeansRepository
    },
    {
      provide: DashBoardRepositories,
      useClass: DashboardDataRepository
    },
    {
      provide: DeleteTeansRepositories,
      useClass: DeleteTeansRepository
    },
    {
      provide: CreateTeansRepositories,
      useClass: CreateTeansRepository
    },
    {
      provide: UpdateTeansRepositories,
      useClass: UpdateTeansRepository
    },
    {
      provide: PatchTeansRepositories,
      useClass: PatchTeansRepository
    },
    {
      provide: CategoryRepositories,
      useClass: CategoryRepository
    },
    {
      provide: CreateCategoryRepositories,
      useClass: CreateCategoryRepository
    },
    {
      provide: DeleteCategoryRepositories,
      useClass: DeleteCategoryRepository
    },
    {
      provide: QuickAnswersRepositories,
      useClass: QuickAnswersRepository
    },
    {
      provide: TeamQuickAnswersByIdRepositories,
      useClass: TeamQuickAnswersByIdRepository
    },
    {
      provide: CreateQuickAnswersRepositories,
      useClass: CreateQuickAnswersRepository
    },
    {
      provide: CreateTeamQuickAnswersRepositories,
      useClass: CreateTeamQuickAnswersRepository
    },
    {
      provide: UpdateQuickAnswersRepositories,
      useClass: UpdateQuickAnswersRepository
    },
    {
      provide: DeleteQuickAnswersRepositories,
      useClass: DeleteQuickAnswersRepository
    },
    {
      provide: GroupRepositories,
      useClass: GroupDataRepository
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DataModule {}
