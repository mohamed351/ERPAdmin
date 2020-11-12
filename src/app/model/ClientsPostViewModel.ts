export interface ClientPostViewModel {
  clientName: string;
  sales: number;
  clientPhone: string;
  clientPhone2: string;
  taxCertificate: string;
  commercialRegister: string;
  fax: string;
  email: string;
  clientAddress: string;
  clientBillingAddress: string;
  referenceContract: string;
  clientLinesBLAddress: string;
  bankDetails: string;
  webSite: string;
  countryID: number;
  personalInCharge: PersonalInCharge[];
  firstBalance: FirstBalance[];
  netWork: NetWork[];
  preventClientFromOperation: boolean;
  clientCredit: ClientCredit;
  accts: number;
  isRevalue: boolean;
  image:string
}

export interface ClientCredit {
  day: number;
  limit: number;
}

export interface NetWork {
  group: number;
  expireDate: string;
}

export interface FirstBalance {
  contactBalance: string;
  balanceCurrency: number;
}

interface PersonalInCharge {
  title: string;
  name: string;
  phone1: string;
  phone2: string;
  email: string;
}

export interface ClientGetViewModel extends  ClientPostViewModel {
    id:number,  
    contact_Type_ID_FK:number
}