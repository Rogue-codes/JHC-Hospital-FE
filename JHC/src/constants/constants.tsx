import { ISidebar } from "../interfaces/sidebar.interface";
import { Icons } from "../components/icons/index";
import { IEducationalContent } from "../interfaces/educational.interface";
import { edu1, edu2, edu3, edu4 } from "../assets";
import { IPatientFee } from "../interfaces/patientfee.interface";
import { IAppointment } from "../interfaces/appointment.interface";

export const sideBarArr: ISidebar[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <Icons.dashBoard />,
    iconActive: <Icons.dashBoardActive />,
  },
  {
    label: "Patients",
    path: "/dashboard/patients",
    icon: <Icons.patient />,
    iconActive: <Icons.patientActive />,
  },
  {
    label: "Appointment",
    path: "/dashboard/appointment",
    icon: <Icons.appointment />,
    iconActive: <Icons.appointmentActive />,
  },
  {
    label: "Doctors",
    path: "/dashboard/doctors",
    icon: <Icons.doctor />,
    iconActive: <Icons.doctorActive />,
  },
  {
    label: "Messages",
    path: "/dashboard/messages",
    icon: <Icons.messages />,
    iconActive: <Icons.messagesActive />,
  },
  {
    label: "Education Content",
    path: "/dashboard/education-content",
    icon: <Icons.education />,
    iconActive: <Icons.educationActive />,
  },
  {
    label: "Medicine Inventory",
    path: "/dashboard/inventory",
    icon: <Icons.inventory />,
    iconActive: <Icons.inventoryActive />,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: <Icons.settings />,
    iconActive: <Icons.settingsActive />,
  },
];

export const educationalContentArr: IEducationalContent[] = [
  {
    author: "By Joel Paulliston",
    img: edu1,
    title: "4 Nutritions to Take Daily",
  },
  {
    author: "By Joel Paulliston",
    img: edu2,
    title: "6 Healthy Lifestyle Tips ",
  },
  {
    author: "By John Paulliston",
    img: edu3,
    title: "Do’s and Don’ts in Hospital",
  },
  {
    author: "By Joel Paulliston",
    img: edu4,
    title: "Healthy Habits to Follow",
  },
];

export const patientFeeArr: IPatientFee[] = [
  {
    patient: "EG Subramani",
    img: edu1,
    isFeePending: true,
  },
  {
    patient: "Elizabeth Polson",
    img: edu2,
    isFeePending: true,
  },
  {
    patient: "Sumanth Tinson",
    img: edu3,
    isFeePending: true,
  },
  {
    patient: "Krishtav Rajan",
    img: edu4,
    isFeePending: true,
  },
];

export const appointmentArr: IAppointment[] = [
  {
    date: "05/12/2022",
    time: "9:30 AM",
    patient_name: "Elizabeth Polson",
    doctor: "Dr. John",
  },
  {
    date: "05/12/2022",
    time: "9:30 AM",
    patient_name: "John David",
    doctor: "Dr. Joel",
  },
  {
    date: "05/12/2022",
    time: "10:30 AM",
    patient_name: "Sumanth Tinson",
    doctor: "Dr. Joel",
  },
  {
    date: "05/12/2022",
    time: "11:00 AM",
    patient_name: "Krishtav Rajan",
    doctor: "Dr. John",
  },
  {
    date: "05/12/2022",
    time: "11:30 AM",
    patient_name: "EG Subramani",
    doctor: "Dr. John",
  },
];
