export interface GroupModel {
    id: number;
    name: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    companyId: number;
    teams?: TeamGroup[];
}

export interface TeamGroup {
    id: number;
    name: string;
    color: string;
    status: boolean;
    messageWhatsappId: number;
    createdAt: Date;
    updatedAt: Date;
}
