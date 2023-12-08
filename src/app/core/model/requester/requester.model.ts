export interface requesterModelR {
    id: number;
    name: string;
    email: string;
    phone: string;
    companyId: number;
    selected?: boolean;
};


export interface saveRequesterModel {
    ticketId: number | undefined;
    contactId: number;
}

export interface GetRequesterByTicketId {
    id: number;
    ticketId: number;
    contactId: number;
}
