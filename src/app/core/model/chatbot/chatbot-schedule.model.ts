export interface GetAllMessageTemplate {
    id: number;
    title: string;
    message: string;
    sendDate: Date;
    repeatSendDate: Date;
    messageTemplateId: number;
    contactId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface GetAllMessageTemplateR {
    id: number;
    name: string;
    type: string;
    message: string;
    companyId: number;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export interface SaveMessageSend {
    id?: number;
    title: string;
    message: string;
    sendDate: string;
    repeatSendDate: string | null;
    messageTemplateId: number;
    contactId: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface SaveMessageReturn {
    title: string;
    message: string;
    sendDate: Date;
    repeatSendDate: Date;
    messageTemplateId: null;
    contactId: number;
    createdAt: Date;
    updatedAt: Date;
    id: number;
}


