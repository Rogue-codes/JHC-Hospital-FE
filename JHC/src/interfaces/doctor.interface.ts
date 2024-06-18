/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDoctor {
  _id?: string;
  first_name: string;
  last_name: string;
  gender: string;
  DOB: Date;
  is_consultant: boolean;
  unit: "Pediatrics" | "Gynecology" | "General Medicine" | "Surgery";
  phone: string;
  email: string;
  img_url?: string; // optional field
  is_verified: boolean;
  is_active: boolean;
  password?: string;
  hasChangedSystemGeneratedPassword: boolean;
  createdAt?: Date; // added by Mongoose timestamps
  updatedAt?: Date; // added by Mongoose timestamps
}

export interface IDoctorResponse {
  status: string;
  message: string;
  data: IDoctor[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ICreateDoctor {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  DOB: any;
  is_consultant: boolean;
  unit: string;
  gender: string;
}

export interface IUpdateDoctor {
  _id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  DOB: any;
  is_consultant: boolean;
  unit: string;
  gender: string;
}
