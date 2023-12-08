export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    type: number;
    companyId: number;
    groupId: number;
    active: boolean;
}
