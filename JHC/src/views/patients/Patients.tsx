/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { pic } from "../../assets";
import Filter from "../../components/filters/Filter";
import { Icons } from "../../components/icons";
import { patientArr } from "../../constants/constants";
import PatientHeader from "./PatientHeader";
import { Space, Table, type TableProps } from "antd";
import BackDrop from "../../components/modal/BackDrop";

export interface DataType {
  // key: string;
  patientName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phoneNumber: string;
  emailId: string;
}
export default function Patients() {
  const [showCreatePatientModal, setShowCreatePatientModal] = useState(false)
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patient_name",
      render: (text:string) => (
        <Space size="middle" className="">
          <div className="w-8 flex justify-center items-center h-8 rounded-full cursor-pointer">
            <img src={pic} className="w-full h-full rounded-full" alt="" />
          </div>
          <p>{text}</p>
        </Space>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      key: "blood_group",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phone_number",
    },
    {
      title: "Email ID",
      dataIndex: "emailId",
      key: "email_id",
    },
    {
      title: "User Action",
      key: "action",
      render: (_) => (
        <Space size="middle" className="">
          <div className="w-6 flex justify-center items-center h-6 rounded-lg bg-JHC-Primary cursor-pointer">
            <Icons.chat />
          </div>
          <div className="w-6 h-6 rounded-lg border flex justify-center items-center border-JHC-Red cursor-pointer">
            <Icons.cancel />
          </div>
          <div className="w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer  border-JHC-Primary">
            <Icons.info />
          </div>
        </Space>
      ),
    },
  ];

  const closeModal = () => {
    setShowCreatePatientModal(false);
  }
  return (
    <div className="w-full p-5 bg-white h-screen border rounded-lg">
      <PatientHeader setShowCreatePatientModal={setShowCreatePatientModal} />
      <Filter />
      <div className="mt-24 h-[60vh]">
        <Table columns={columns} dataSource={patientArr} />
      </div>

      {showCreatePatientModal && <BackDrop onClose={closeModal} />}
    </div>
  );
}
