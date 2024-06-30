/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import AppointmentHeader from "./AppointmentHeader";
import {
  ConfigProvider,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Table,
  TableProps,
  Tag,
} from "antd";
import { Icons } from "../../components/icons";
import { IAppointment } from "../../interfaces/appointment.interface";
import {
  useGetReservationsQuery,
  useRejectAppointmentMutation,
} from "../../api/reservation.api";
import CustomPagination from "../../components/pagination/CustomPagination";
import Filter from "../../components/filters/Filter";
import AppointmentDetails from "./AppointmentDetails";
import CreateAppointment from "./CreateAppointment";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import RescheduleAppointment from "./RescheduleAppointment";

export interface IDataType {
  // key: string;
  time: string;
  date: string;
  patientName: string;
  patientAge: number;
  doctor: string;
}
export default function Appointments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [viewAppointment, setViewAppointment] = useState(false);
  const [createAppointmentModal, setCreateAppointmentModal] = useState(false);
  const [rescheduleAppointmentModal, setRescheduleAppointmentModal] =
    useState(false);
  const [selectedAppointment, setselectedAppointment] =
    useState<IAppointment | null>(null);

  const [activeTab, setActiveTab] = useState(0);

  const { data: reservations, isLoading } = useGetReservationsQuery({
    page: currentPage,
    search,
    status: activeTab === 1 ? "completed" : undefined,
  });

  const [rejectAppointment, { isLoading: rejectingAppointment }] =
    useRejectAppointmentMutation();

  const handleAppointmentRejection = () => {
    rejectAppointment({ id: selectedAppointment?._id as string })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message);
      });
  };

  const text = `Are you sure you want to 
      Reject appointment for 
    ${selectedAppointment?.patient?.first_name} ${selectedAppointment?.patient?.last_name} with Dr. ${selectedAppointment?.doctor?.first_name} ${selectedAppointment?.doctor?.last_name}?`;
  const description = `Appointment will be canceled.`;
  const buttonWidth = 80;

  const columns: TableProps<IAppointment>["columns"] = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (_, row) => {
        const formattedTime = new Date(row.time).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return (
          <Space size="middle" className="">
            <p>{formattedTime}</p>
          </Space>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "time",
      key: "time",
      render: (_, row) => {
        const formatDate = (date: any) => {
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
          const year = d.getFullYear();
          return `${day}-${month}-${year}`;
        };

        const formattedDate = formatDate(row.time);

        return (
          <Space size="middle" className="">
            <p>{formattedDate}</p>
          </Space>
        );
      },
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patient_name",
      render: (_, row) => (
        <Space size="middle" className="">
          <p>
            {row.patient.first_name} {row.patient.last_name}
          </p>
        </Space>
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (_, row) => (
        <Space size="middle" className="">
          <p>
            Dr. {row.doctor.first_name} {row.doctor.last_name}
          </p>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "reservation_status",
      key: "reservation_status",
      render: (_, row) => (
        <Space size="middle" className="">
          <Tag
            color={
              row.reservation_status === "awaiting doctor approval"
                ? "orange"
                : row.reservation_status === "rejected"
                ? "red"
                : row.reservation_status === "pending" ||
                  row.reservation_status === "ongoing"
                ? "blue"
                : "green"
            }
          >
            {row.reservation_status}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      render: (_, row) => (
        <Space size="middle" className="">
          <p>₦ {row.fee.toLocaleString()}</p>
        </Space>
      ),
    },
    {
      title: "Fee Status",
      dataIndex: "fee_status",
      key: "fee_status",
      render: (_, row) => (
        <Space size="middle" className="">
          <Tag color={row.fee_status === "unpaid" ? "red" : "green"}>
            {row.fee_status}
          </Tag>
        </Space>
      ),
    },
    {
      title: "User Action",
      key: "action",
      render: (_, row) => (
        <Space size="middle" className="">
          <p
            className={`${row.reservation_status === "rejected" && "opacity-50 cursor-not-allowed"} text-JHC-Primary cursor-pointer font-semibold`}
            onClick={() => {
              if (row.reservation_status === "rejected") return;
              setselectedAppointment(row);
              setRescheduleAppointmentModal(true);
            }}
          >
            Reschedule
          </p>

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
              onConfirm={handleAppointmentRejection}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <div className="w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer  bg-[#FF9C94]">
                <Icons.cancelWhite
                  onClick={() => setselectedAppointment(row)}
                />
              </div>
            </Popconfirm>
          </ConfigProvider>

          <div
            className="w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer  border-JHC-Primary"
            onClick={() => {
              setselectedAppointment(row);
              setViewAppointment(true);
            }}
          >
            <Icons.info />
          </div>
        </Space>
      ),
    },
  ];

  const tabs = ["NEW APPOINTMENTS", "COMPLETED APPOINTMENTS"];
  return (
    <div className="w-full h-screen bg-white rounded-lg p-5 border">
      <AppointmentHeader
        activeTab={activeTab}
        tabs={tabs}
        setActiveTab={setActiveTab}
        setCreateAppointmentModal={setCreateAppointmentModal}
      />
      <Filter search={search} setSearch={setSearch} />
      <div className="mt-12">
        <Table
          columns={columns}
          dataSource={reservations?.data}
          pagination={false}
          loading={isLoading}
        />
      </div>
      <div className="py-4 mt-5 flex justify-end items-center">
        <CustomPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={reservations?.meta?.total as number}
        />
      </div>

      <Modal
        title={`Create Appointment`}
        style={{ top: 20 }}
        open={createAppointmentModal}
        footer={null}
        centered
        className="!w-[50vw]"
        closable
        onCancel={() => setCreateAppointmentModal(false)}
      >
        <CreateAppointment
          setCreateAppointmentModal={setCreateAppointmentModal}
        />
      </Modal>

      <Modal
        title={`Reservation for ${selectedAppointment?.patient.first_name}  ${selectedAppointment?.patient.last_name}`}
        style={{ top: 20 }}
        open={viewAppointment}
        footer={null}
        centered
        className="!w-[70vw]"
        closable
        onCancel={() => setViewAppointment(false)}
      >
        <AppointmentDetails
          selectedAppointment={selectedAppointment}
          setRescheduleAppointmentModal={setRescheduleAppointmentModal}
        />
      </Modal>
      <Spin
        spinning={rejectingAppointment}
        indicator={<LoadingOutlined spin style={{ fontSize: 64 }} />}
        fullscreen
      />
      <Modal
        title={`Reschedule Appointment for ${selectedAppointment?.patient.first_name}  ${selectedAppointment?.patient.last_name}`}
        style={{ top: 20 }}
        open={rescheduleAppointmentModal}
        footer={null}
        centered
        className="!w-[30vw]"
        closable
        onCancel={() => setRescheduleAppointmentModal(false)}
      >
        <RescheduleAppointment
          setRescheduleAppointmentModal={setRescheduleAppointmentModal}
          selectedAppointment={selectedAppointment}
        />
      </Modal>
    </div>
  );
}
