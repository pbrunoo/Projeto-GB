export interface ModelMessageInterface {
  id?: number;
  name: string;
  type: string;
  message: string;
  companyId: number;
  createdAt?: string;
  updatedAt?: string;
  messageSchedules?: MessageSchedulesInterface[]
}

export interface MessageSchedulesInterface {
    id?: number;
    title : string;
    message: string;
    sendDate: string;
    repeatSendDate: string | null;
    messageTemplateId: number;
    contactId: number;
    createdAt?: string;
    updatedAt?: string;
}
