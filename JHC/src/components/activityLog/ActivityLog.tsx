/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin, Timeline } from "antd";
import { useGetLogsQuery } from "../../api/doctors.api";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetPatientLogsQuery } from "../../api/patients.api";
import { useGetReservationLogsQuery } from "../../api/reservation.api";

interface IActivityLog {
  id: string;
  log: string;
}
export default function ActivityLog({ id, log }: IActivityLog) {
  const { data: doctorLog, isLoading: doctorLogLoading } = useGetLogsQuery({
    id,
  });
  const { data: patientLog, isLoading: patientLogLoading } =
    useGetPatientLogsQuery({ id });
  const { data: reservationLogsData, isLoading: loadingLogs } =
    useGetReservationLogsQuery({
      id,
    });
  const Logs =
    log === "doctor"
      ? doctorLog?.data
      : log === "patient"
      ? patientLog?.data
      : reservationLogsData?.data;

  const activity = Logs?.map((data: any) => {
    const status = data?.activity.split(" ")[1];
    console.log("status", status);
    return {
      color:
        status === "REJECTED"
          ? "red"
          : status === "RESCHEDULED"
          ? "orange"
          : "green",
      children: (
        <>
          <p>{data?.activity}</p>
          <p>{dayjs(data?.Date).format("MM/DD/YYYY, h:mm:ss A")}</p>
        </>
      ),
    };
  });

  return (
    <div>
      <Timeline items={activity} />
      <div className="w-full flex justify-center items-center">
        <Spin
          spinning={doctorLogLoading || patientLogLoading || loadingLogs}
          indicator={
            <LoadingOutlined
              spin
              style={{
                fontSize: 48,
              }}
            />
          }
        />
      </div>
    </div>
  );
}
