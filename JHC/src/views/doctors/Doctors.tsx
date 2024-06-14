/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Table, TableProps } from "antd";
import Filter from "../../components/filters/Filter";
import DoctorHeader from "./DoctorsHeader";
import { Icons } from "../../components/icons";
import { doctorsArr } from "../../constants/constants";

export interface DoctordataType {
  // key: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  unit: string;
  phoneNumber: string;
  emailId: string;
}
export default function Doctors() {
    const columns: TableProps<DoctordataType>["columns"] = [
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "first_name",
      },
      {
        title: "last Name",
        dataIndex: "lastName",
        key: "last_name",
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
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
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
  return (
    <div className="w-full h-screen bg-white border rounded-lg p-5">
      <DoctorHeader />
      <Filter />
      <div className="mt-24 h-[60vh]">
        <Table columns={columns} dataSource={doctorsArr} />
      </div>
    </div>
  );
}
