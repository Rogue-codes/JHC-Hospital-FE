/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Spin, Table, TableProps } from "antd";
import Filter from "../../components/filters/Filter";
import DoctorHeader from "./DoctorsHeader";
import { Icons } from "../../components/icons";
import {
  useChangeDoctorStatusMutation,
  useGetDoctorByIdQuery,
  useGetDoctorsQuery,
} from "../../api/doctors.api";
import { IDoctor } from "../../interfaces/doctor.interface";
import calcAge from "../../utils";
import CustomPagination from "../../components/pagination/CustomPagination";
import { useState } from "react";
import { Modal } from "antd";
import CreateDoctor from "./CreateDoctor";
import { ConfigProvider, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import ViewDoctorDetailsModal from "./ViewDoctorDetails";
import { LoadingOutlined } from "@ant-design/icons";


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
  const [viewDoctorDetails, setViewDoctorDetails] = useState(false);
  const [isModify, setIsModify] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);

  const text = `Are you sure you want to ${
    selectedDoctor?.is_active ? "Deactivate" : "Reactivate"
  } ${selectedDoctor?.first_name} ${selectedDoctor?.last_name}?`;
  const description = `Doctor will become ${
    selectedDoctor?.is_active ? "inactive" : "active"
  }`;
  const buttonWidth = 80;

  const [changeStatus, { isLoading: changingDoctorStatus }] =
    useChangeDoctorStatusMutation();

  const handleChangeStatus = (doctor: IDoctor) => {
    changeStatus({ id: doctor._id as string })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message);
      });
  };

  const { data, isLoading: getingDoctorDetails } = useGetDoctorByIdQuery({
    id: selectedDoctor?._id as string,
  });

  const doctor = data?.data;

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
      render: (_, row) => (
        <Space size="middle" className="">
          {row.is_verified && (
            <div className="w-6 flex justify-center items-center h-6 rounded-lg bg-JHC-Primary cursor-pointer">
              <Icons.chat />
            </div>
          )}

          {row.is_verified && (
            <div
              className={`${
                row.is_active ? "border-JHC-Red " : "border-OBS-Green"
              } w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer`}
            >
              <ConfigProvider
                button={{
                  style: { width: buttonWidth, margin: 4 },
                }}
              >
                <Popconfirm
                  placement="bottom"
                  title={text}
                  description={description}
                  arrow
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleChangeStatus(row)}
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                  {row.is_active ? (
                    <Icons.cancel onClick={() => setSelectedDoctor(row)} />
                  ) : (
                    <FaCheck
                      color="#47C96B"
                      onClick={() => setSelectedDoctor(row)}
                    />
                  )}
                </Popconfirm>
              </ConfigProvider>
            </div>
          )}

          <div
            className="w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer  border-JHC-Primary"
            onClick={() => {
              setViewDoctorDetails(true);
              setSelectedDoctor(row);
            }}
          >
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
        <CreateDoctor
          setOpenModal={setOpenModal}
          isModify={isModify}
          correctDoctorObj={doctor}
        />
      </Modal>
      <Spin
        spinning={changingDoctorStatus}
        indicator={<LoadingOutlined spin style={{ fontSize: 64 }} />}
        fullscreen
      />
      <Modal
        title={`Dr. ${selectedDoctor?.first_name} ${selectedDoctor?.last_name}`}
        style={{ top: 20 }}
        open={viewDoctorDetails}
        footer={null}
        centered
        className="!w-[30vw]"
        closable
        onCancel={() => setViewDoctorDetails(false)}
      >
        <ViewDoctorDetailsModal
          doctor={doctor as IDoctor}
          isLoading={getingDoctorDetails}
          setOpenModal={setOpenModal}
          setViewDoctorDetails={setViewDoctorDetails}
          setIsModify={setIsModify}
        />
      </Modal>
    </div>
  );
}
