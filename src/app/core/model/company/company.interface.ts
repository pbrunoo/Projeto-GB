export interface CompanyInterface {
  id?: string;
  name: string,
  businessName: string;
  cnpj: string;
  email: string;
  phone: string;
  createdAt?: string;
  updateAt?: string;
  contacts: ContactCompanyInterface[];
}

export interface ContactCompanyInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyId: string;
}
