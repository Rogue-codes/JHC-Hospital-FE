/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import AppointmentHeader from "./AppointmentHeader";
import { Modal, Space, Table, TableProps } from "antd";
import { Icons } from "../../components/icons";
import { IAppointment } from "../../interfaces/appointment.interface";
import { useGetReservationsQuery } from "../../api/reservation.api";
import CustomPagination from "../../components/pagination/CustomPagination";
import Filter from "../../components/filters/Filter";
import AppointmentDetails from "./AppointmentDetails";
import CreateAppointment from "./CreateAppointment";
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
  const [selectedAppointment, setselectedAppointment] =
    useState<IAppointment | null>(null);

  const { data: reservations, isLoading } = useGetReservationsQuery({
    page: currentPage,
    search,
  });

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
    },
    {
      title: "User Action",
      key: "action",
      render: (_, row) => (
        <Space size="middle" className="">
          <p className="text-JHC-Primary cursor-pointer font-semibold">
            Reschedule
          </p>
          <div className="w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer  bg-[#FF9C94]">
            <Icons.cancelWhite />
          </div>

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

  const [activeTab, setActiveTab] = useState(0);

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
      <div className="mt-5 flex justify-end items-center">
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
        <AppointmentDetails selectedAppointment={selectedAppointment} />
      </Modal>
    </div>
  );
}
