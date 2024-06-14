/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import AppointmentHeader from "./AppointmentHeader";
import { Space, Table, TableProps } from "antd";
import { Icons } from "../../components/icons";
import { appointmentTableArr } from "../../constants/constants";

export interface IDataType {
  // key: string;
  time: string;
  date: string;
  patientName: string;
  patientAge: number;
  doctor: string;
}
export default function Appointments() {

  const columns: TableProps<IDataType>["columns"] = [
    {
      title: "Time",
      dataIndex: "patientName",
      key: "patient_name",
      // render: (text: string) => (
      //   <Space size="middle" className="">
      //     <div className="w-8 flex justify-center items-center h-8 rounded-full cursor-pointer">
      //       <img src={pic} className="w-full h-full rounded-full" alt="" />
      //     </div>
      //     <p>{text}</p>
      //   </Space>
      // ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patient_name",
    },
    {
      title: "Patient Age",
      dataIndex: "patientAge",
      key: "patient_age",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "User Action",
      key: "action",
      render: (_) => (
        <Space size="middle" className="">
          <p className="text-JHC-Primary cursor-pointer font-semibold">Reschedule</p>
          <div className="w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer  bg-[#FF9C94]">
            <Icons.cancelWhite />
          </div>
        </Space>
      ),
    },
  ];

  const [activeTab,setActiveTab] = useState(0)

  const tabs = ["NEW APPOINTMENTS", "COMPLETED APPOINTMENTS"];
  return (
    <div className="w-full h-screen bg-white rounded-lg p-5 border">
      <AppointmentHeader
        activeTab={activeTab}
        tabs={tabs}
        setActiveTab={setActiveTab}
      />
      <div className="mt-24 h-[60vh]">
        <Table columns={columns} dataSource={appointmentTableArr} />
      </div>
    </div>
  );
}
