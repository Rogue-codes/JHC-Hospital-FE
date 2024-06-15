/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Table, TableProps } from "antd";
import Filter from "../../components/filters/Filter";
import DoctorHeader from "./DoctorsHeader";
import { Icons } from "../../components/icons";
import { useGetDoctorsQuery } from "../../api/doctors.api";
import { IDoctor } from "../../interfaces/doctor.interface";
import calcAge from "../../utils";
import CustomPagination from "../../components/pagination/CustomPagination";
import { useState } from "react";
import { Modal } from "antd";
import CreateDoctor from "./CreateDoctor";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: doctorsData, isLoading } = useGetDoctorsQuery({
    page: currentPage,
    search,
  });

  const [openModal, setOpenModal] = useState(false);

   const handleCloseModal = () => {
     setOpenModal(false);
   };

  const columns: TableProps<IDoctor>["columns"] = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (_, { DOB }) => <p>{calcAge(DOB)}</p>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (_, { gender }) => <p>{gender === "female" ? "F" : "M"}</p>,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone_number",
    },
    {
      title: "Email ID",
      dataIndex: "email",
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
      <DoctorHeader setOpenModal={setOpenModal} />
      <Filter noDate={false} search={search} setSearch={setSearch} />
      <div className="mt-12">
        <Table
          columns={columns}
          dataSource={doctorsData?.data}
          pagination={false}
          loading={isLoading}
        />
      </div>
      <div className="w-full py-5 flex justify-end items-center">
        <CustomPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={doctorsData?.meta?.total as number}
        />
      </div>

      <Modal
        title="Create Doctor"
        style={{ top: 20 }}
        open={openModal}
        footer={null}
        centered
        className="!w-[50vw]"
        closable
        onCancel={handleCloseModal}
      >
        <CreateDoctor setOpenModal={setOpenModal}/>
      </Modal>
    </div>
  );
}
