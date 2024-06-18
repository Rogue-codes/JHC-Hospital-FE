import { ISidebar } from "../interfaces/sidebar.interface";
import { Icons } from "../components/icons/index";
import { IEducationalContent } from "../interfaces/educational.interface";
import { edu1, edu2, edu3, edu4, pic } from "../assets";
import { IPatientFee } from "../interfaces/patientfee.interface";
import { IAppointment } from "../interfaces/appointment.interface";
import { DataType } from "../views/patients/Patients";
import { IDataType } from "../views/appointments/Appointments";
import { IMessageList } from "../interfaces/messageList.interface";
import { IInventory } from "../interfaces/inventory.interface";

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
    patient_age: 23,
  },
  {
    date: "05/12/2022",
    time: "9:30 AM",
    patient_name: "John David",
    doctor: "Dr. Joel",
    patient_age: 23,
  },
  {
    date: "05/12/2022",
    time: "10:30 AM",
    patient_name: "Sumanth Tinson",
    doctor: "Dr. Joel",
    patient_age: 23,
  },
  {
    date: "05/12/2022",
    time: "11:00 AM",
    patient_name: "Krishtav Rajan",
    doctor: "Dr. John",
    patient_age: 23,
  },
  {
    date: "05/12/2022",
    time: "11:30 AM",
    patient_name: "EG Subramani",
    doctor: "Dr. John",
    patient_age: 23,
  },
];

export const appointmentTableArr: IDataType[] = [
  {
    date: "05/12/2022",
    time: "9:30 AM",
    patientName: "Elizabeth Polson",
    doctor: "Dr. John",
    patientAge: 23,
  },
  {
    date: "05/12/2022",
    time: "9:30 AM",
    patientName: "John David",
    doctor: "Dr. Joel",
    patientAge: 23,
  },
  {
    date: "05/12/2022",
    time: "10:30 AM",
    patientName: "Sumanth Tinson",
    doctor: "Dr. Joel",
    patientAge: 23,
  },
  {
    date: "05/12/2022",
    time: "11:00 AM",
    patientName: "Krishtav Rajan",
    doctor: "Dr. John",
    patientAge: 23,
  },
  {
    date: "05/12/2022",
    time: "11:30 AM",
    patientName: "EG Subramani",
    doctor: "Dr. John",
    patientAge: 23,
  },
];


export const Units = [
  {
    label: "Pediatrics",
    value: "Pediatrics",
  },
  {
    label: "Gynecology",
    value: "Gynecology",
  },
  {
    label: "General Medicine",
    value: "General Medicine",
  },
  {
    label: "Surgery",
    value: "Surgery",
  }
];

export const blood_group = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O-",
    value: "O-",
  }
];

export const genotype = [
  {
    label: "AA",
    value: "AA",
  },
  {
    label: "AS",
    value: "AS",
  },
  {
    label: "SS",
    value: "SS",
  }
];

export const messageListArr: IMessageList[] = [
  {
    action: "Sent attachment",
    img: pic,
    name: "Dr John Paulliston",
    time: "9:00am",
    isOnline: true,
  },
  {
    action: "Sent attachment",
    img: pic,
    name: "Dr John Paulliston",
    time: "9:00am",
    isOnline: true,
  },
  {
    action: "Sent attachment",
    img: pic,
    name: "Dr John Paulliston",
    time: "9:00am",
    isOnline: true,
  },
  {
    action: "Sent attachment",
    img: pic,
    name: "Dr John Paulliston",
    time: "9:00am",
    isOnline: true,
  },
  {
    action: "Sent attachment",
    img: pic,
    name: "Dr John Paulliston",
    time: "9:00am",
    isOnline: true,
  },
  {
    action: "Sent attachment",
    img: pic,
    name: "Dr John Paulliston",
    time: "9:00am",
    isOnline: true,
  },
  {
    action: "Sent attachment",
    img: pic,
    name: "Dr John Paulliston",
    time: "9:00am",
    isOnline: true,
  },
  {
    action: "Sent attachment",
    img: pic,
    name: "Dr John Paulliston",
    time: "9:00am",
    isOnline: true,
  },
];

export const messagesListArr = [
  {
    msg: "Hi I need to meet Dr. Joel Tomorrow Urgently, Please arrange appointment.",
    time: "9:00am",
  },
  {
    msg: "Unfortunately, all of his appointments for tomorrow are fully booked. we do have a cancellation list, and sometimes patients cancel their appointments at the last minute. If you would like, I can put you on the cancellation list and give you a call if a spot opens up.",
    time: "9:25am",
  },
  {
    msg: "could you please check if there are any other available times for an appointment as this is an Emergency Situation.",
    time: "9:30am",
  },
  {
    msg: "Dr. Joel has agreed to see you tomorrow at 9:00 am due to the urgency of your situation.",
    time: "9:40am",
  },
  {
    msg: "Thank you for scheduling my appointment. I confirm that I will be present tomorrow at the designated time",
    time: "9:45am",
  },
];


export const drugsArr: IInventory[] = [
  {
    expiryDate: "01 Jun 2024",
    stockCount: 100,
    manufacturer: "John’s Health Care",
    price: 28.55,
    productName: "Albuterol (salbutamol)",
    type: "Inhaler",
  },
  {
    expiryDate: "01 Jun 2024",
    stockCount: 100,
    manufacturer: "John’s Health Care",
    price: 28.55,
    productName: "Albuterol (salbutamol)",
    type: "Inhaler",
  },
  {
    expiryDate: "01 Jun 2024",
    stockCount: 100,
    manufacturer: "John’s Health Care",
    price: 28.55,
    productName: "Albuterol (salbutamol)",
    type: "Inhaler",
  },
  {
    expiryDate: "01 Jun 2024",
    stockCount: 100,
    manufacturer: "John’s Health Care",
    price: 28.55,
    productName: "Albuterol (salbutamol)",
    type: "Inhaler",
  },
  {
    expiryDate: "01 Jun 2024",
    stockCount: 100,
    manufacturer: "John’s Health Care",
    price: 28.55,
    productName: "Albuterol (salbutamol)",
    type: "Inhaler",
  },
  {
    expiryDate: "01 Jun 2024",
    stockCount: 100,
    manufacturer: "John’s Health Care",
    price: 28.55,
    productName: "Albuterol (salbutamol)",
    type: "Inhaler",
  },
  {
    expiryDate: "01 Jun 2024",
    stockCount: 100,
    manufacturer: "John’s Health Care",
    price: 28.55,
    productName: "Albuterol (salbutamol)",
    type: "Inhaler",
  },
  {
    expiryDate: "01 Jun 2024",
    stockCount: 100,
    manufacturer: "John’s Health Care",
    price: 28.55,
    productName: "Albuterol (salbutamol)",
    type: "Inhaler",
  },
];