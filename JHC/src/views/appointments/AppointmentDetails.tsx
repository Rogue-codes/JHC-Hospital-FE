import { ConfigProvider, Divider, Popconfirm, Spin, Tag } from "antd";
import { AiOutlineStop } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { IAppointment } from "../../interfaces/appointment.interface";
import { LoadingOutlined } from "@ant-design/icons";
import {
  useGetReservationByIdQuery,
  useRejectAppointmentMutation,
} from "../../api/reservation.api";
import ActivityLog from "../../components/activityLog/ActivityLog";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface IAppointmentDetails {
  selectedAppointment: IAppointment | null;
  setRescheduleAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AppointmentDetails({
  selectedAppointment,
  setRescheduleAppointmentModal,
}: IAppointmentDetails) {
  const { data: reservationData, isLoading } = useGetReservationByIdQuery({
    id: selectedAppointment?._id as string,
  });

  const reservation: IAppointment = reservationData?.data;

  const formattedTime = new Date(reservation?.time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const formatDate = (date: any) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedDate = formatDate(reservation?.time);
  const text = `Are you sure you want to 
      Reject appointment for 
    ${selectedAppointment?.patient?.first_name} ${selectedAppointment?.patient?.last_name} with Dr. ${selectedAppointment?.doctor?.first_name} ${selectedAppointment?.doctor?.last_name}?`;
  const description = `Appointment will be canceled.`;
  const buttonWidth = 80;

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

  return (
    <div className="p-6">
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 48,
                }}
                spin
              />
            }
          />
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full  flex justify-between gap-2 items-center">
            <div className="w-1/2 h-full p-4 rounded-lg border">
              <h1 className="font-bold text-lg ">Schedule</h1>
              <div className="flex mt-4 justify-start gap-12 items-center">
                <div>
                  <p className="font-bold">Time:</p> <p>{formattedTime}</p>
                </div>

                <div>
                  <p className="font-bold">Date:</p> <p>{formattedDate}</p>
                </div>
              </div>
              <Divider />

              <div>
                <p className="mt-5 font-bold">Patient Details</p>
                <div className="flex justify-start gap-12 items-center">
                  <div>
                    <p className="font-bold">First Name:</p>{" "}
                    <p>{reservation?.patient.first_name}</p>
                  </div>

                  <div>
                    <p className="font-bold">Last Name:</p>{" "}
                    <p>{reservation?.patient.last_name}</p>
                  </div>
                </div>
              </div>
              <Divider />

              <div>
                <p className="mt-5 font-bold">Doctor Details</p>
                <div className="flex justify-start gap-12 items-center">
                  <div>
                    <p className="font-bold">First Name:</p>{" "}
                    <p>{reservation.doctor.first_name}</p>
                  </div>

                  <div>
                    <p className="font-bold">Last Name:</p>{" "}
                    <p>{reservation.doctor.last_name}</p>
                  </div>
                </div>
              </div>
              <Divider />

              <div>
                <p className="mt-3 font-bold">Appointment Details</p>
                <div className="flex mt-4 justify-start gap-12 items-center">
                  <div>
                    <p className="font-bold">Status:</p>{" "}
                    <Tag
                      color={
                        reservation.reservation_status === "rejected"
                          ? "red"
                          : ""
                      }
                    >
                      {reservation.reservation_status}
                    </Tag>
                  </div>

                  <div>
                    <p className="font-bold">Fee:</p>{" "}
                    <p>
                      ₦{reservation.fee.toLocaleString()} 
                      <Tag
                      className="ml-3"
                        color={
                          reservation.fee_status === "unpaid"
                            ? "red"
                            : "green"
                        }
                      >
                        {reservation.fee_status}
                      </Tag>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2 h-[58vh] rounded-lg p-4 border overflow-y-scroll">
              <h1 className="text-lg font-semibold mb-5">Activity logs</h1>
              <Divider />
              <ActivityLog
                id={selectedAppointment?._id as string}
                log="reservation"
              />
            </div>
          </div>

          <Divider />
          <div className="w-full flex justify-start items-center gap-5">
            <button
              disabled={selectedAppointment?.reservation_status === "rejected"}
              className="flex cursor-pointer justify-start items-center gap-1 disabled:opacity-50"
              onClick={() => setRescheduleAppointmentModal(true)}
            >
              {" "}
              <FaRegEdit size={20} color="#D4A62F" />
              Reschedule
            </button>

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
                <button
                  disabled={
                    selectedAppointment?.reservation_status === "rejected"
                  }
                  className="flex cursor-pointer justify-start items-center gap-1 disabled:opacity-50"
                >
                  {" "}
                  <AiOutlineStop size={20} color="red" />
                  Reject
                </button>
              </Popconfirm>
            </ConfigProvider>
          </div>
        </div>
      )}

      <Spin
        spinning={rejectingAppointment}
        indicator={<LoadingOutlined spin style={{ fontSize: 64 }} />}
        fullscreen
      />
    </div>
  );
}
