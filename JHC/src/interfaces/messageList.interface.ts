import { IAppointment } from "./appointment.interface";

export interface IMessageList{
    name: string;
    action:string;
    img:string;
    time:string
    isOnline:boolean;
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