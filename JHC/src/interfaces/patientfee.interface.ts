export interface IPatientFee {
  img: string;
  patient: string;
  isFeePending: boolean;
}

export interface IPatient {
  _id?: string;
  first_name: string;
  last_name: string;
  gender: string;
  DOB: Date;
  blood_group: string;
  genotype: string;
  phone: string;
  email: string;
  img_url?: string; 
  is_verified: boolean;
  patient_id: string;
  password?: string;
  hasChangedSystemGeneratedPassword: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPatientResponse {
  status: string;
  message: string;
  data: IPatient[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ICreatePatient {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  DOB: any;
  blood_group: string;
  genotype: string;
  password: string;
  gender: string;
}
