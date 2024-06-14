export interface IAppointment {
    time: string;
    date: string;
    patient_name: string;
    doctor: string;
    patient_age?: number;
}