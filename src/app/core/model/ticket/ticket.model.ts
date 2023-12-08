export interface ticketModel {
    subject: string;
    category: string;
    publicanswer: string | null;
    internalanswer: string | null;
    priority: number | string;
    userId: number;
    status?: number;
}

export interface UpdateTicketModel {
    subject: string;
    category: string;
    priority: number | string;
    userId: number;
    status?: number;
    ticketId?: string | number;
}

export interface ListTicketModel {
    id: number;
    subject: string;
    status: number;
    contacts: any[];
    user: UserList[];
    category: string;
    createdAt: Date;
    priority: number;
}

interface UserList {
    id: number;
    email: string;
    password: string;
    name: string;
    type: number;
    companyId: number;
    groupId: number;
}

export interface GetTicketId {
    id: number;
    subject: string;
    category: string;
    publicanswer: string;
    internalanswer: string;
    priority: number;
    userId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface GetTicketUpdate {
    id: number;
    subject: string;
    category: string;
    publicanswer: string;
    internalanswer: string;
    priority: number;
    userId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface SaveMessageTicketS {
    ticketId: number | undefined;
    answer?: string;
    public: boolean;
    attachment?: string[];
    createdAt: string | Date;
    updatedAt: string;
}

export interface SaveMessageTicketR {
    ticketId: number;
    answer: string;
    public: boolean;
    attachment?: string[];
    createdAt: string;
    updatedAt: string;
    id: number;
}

export interface FilterTicket {
    contactId?: [];
    userId?: [];
    category?: [];
    priority?: [];
    createdAtFrom?: string;
    createdAtTo?: string;
}

export interface FilterTicketReturn {
    id: number;
    subject: string;
    category: string;
    priority: number;
    userId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    whatsappId: number;
}


