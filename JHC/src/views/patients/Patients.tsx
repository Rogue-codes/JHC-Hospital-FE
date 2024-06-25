/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Filter from "../../components/filters/Filter";
import { Icons } from "../../components/icons";
import PatientHeader from "./PatientHeader";
import { Modal, Space, Table, type TableProps } from "antd";
import { useGetPatientByIdQuery, useGetPatientsQuery } from "../../api/patients.api";
import CustomPagination from "../../components/pagination/CustomPagination";
import { IPatient } from "../../interfaces/patientfee.interface";
import calcAge, { showInitials } from "../../utils";
import ViewPatientDetails from "./ViewPatientDetails";
import CreatePatient from "./CreatePatient";

export default function Patients() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [showCreatePatientModal, setShowCreatePatientModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);

  const handleCloseModal = () => {
    setShowCreatePatientModal(false);
  };

  const handleModify = () => {
    setShowPatientModal(false);
    setShowCreatePatientModal(true);
  }

  const {data:patientData} = useGetPatientByIdQuery({id:selectedPatient?._id as string})
  const patient = patientData?.data;

  const columns: TableProps<IPatient>["columns"] = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patient_name",
      render: (_, { first_name, last_name, img_url }) => (
        <Space size="middle" className="">
          {!img_url ? (
            <div className="w-8 flex border bg-JHC-Primary text-white justify-center items-center h-8 rounded-full cursor-pointer">
              {showInitials(first_name, last_name)}
            </div>
          ) : (
            <div className="w-8 flex justify-center items-center h-8 rounded-full cursor-pointer">
              <img
                src={img_url}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            </div>
          )}

          <p>
            {first_name} {last_name}
          </p>
        </Space>
      ),
    },
    {
      title: "Patient ID",
      dataIndex: "patient_id",
      key: "patient_id",
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
      title: "Blood Group",
      dataIndex: "blood_group",
      key: "blood_group",
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
      render: (_, row) => (
        <Space size="middle" className="">
          <div className="w-6 flex justify-center items-center h-6 rounded-lg bg-JHC-Primary cursor-pointer">
            <Icons.chat />
          </div>
          {/* <div className="w-6 h-6 rounded-lg border flex justify-center items-center border-JHC-Red cursor-pointer">
            <Icons.cancel />
          </div> */}
          <div
            className="w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer  border-JHC-Primary"
            onClick={() => {
              setShowPatientModal(true);
              setSelectedPatient(row);
            }}
          >
            <Icons.info />
          </div>
        </Space>
      ),
    },
  ];

  const { data, isLoading } = useGetPatientsQuery({
    page: currentPage,
    search: searchText,
  });

  return (
    <div className="w-full p-5 bg-white border rounded-lg">
      <PatientHeader setShowCreatePatientModal={setShowCreatePatientModal} />
      <Filter search={searchText} setSearch={setSearchText} />
      <div className="mt-12">
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          pagination={false}
        />
      </div>
      <div className="w-full flex justify-end items-center mt-5">
        <CustomPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={data?.meta?.total as number}
        />
      </div>

      <Modal
        title="Create Patient"
        style={{ top: 20 }}
        open={showCreatePatientModal}
        footer={null}
        centered
        className="!w-[50vw]"
        closable
        onCancel={handleCloseModal}
      >
        <CreatePatient
          setOpenModal={setShowCreatePatientModal}
          // isModify={isModify}
          correctPatientObj={patient}
        />
      </Modal>

      <Modal
        title={`${selectedPatient?.gender === "female" ? "Mrs" : "Mr"}. ${
          selectedPatient?.first_name
        } ${selectedPatient?.last_name}`}
        style={{ top: 20 }}
        open={showPatientModal}
        footer={null}
        centered
        className="!w-[30vw]"
        closable
        onCancel={() => setShowPatientModal(false)}
      >
        <ViewPatientDetails
          handleModify={handleModify}
          patient={selectedPatient as IPatient}
        />
      </Modal>
    </div>
  );
}
