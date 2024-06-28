export interface ICreateAppointment {
  time: string;
  patient: string;
  doctor: string;
}

export interface IAppointment {
  _id: string;
  time: Date;
  date: Date;
  patient: {
    _id: string;
    first_name: string;
    last_name: string;
    DOB: any;
  };
  doctor: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  fee: number;
  reservation_status: "pending"|
        "awaiting doctor approval"|
        "rejected"|
        "ongoing"|
        "completed";
  fee_status: "unpaid" | "paid";
}

export interface IReservationResponse {
  status: string;
  message: string;
  data: IAppointment[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface IRescheduleAppointment {
  time: any;
}