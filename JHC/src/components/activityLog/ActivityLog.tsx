/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin, Timeline } from "antd";
import { useGetLogsQuery } from "../../api/doctors.api";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetPatientLogsQuery } from "../../api/patients.api";

interface IActivityLog {
  id: string;
  log:string
}
export default function ActivityLog({ id,log }: IActivityLog) {
  const { data: doctorLog, isLoading:doctorLogLoading } = useGetLogsQuery({ id });
  const { data: patientLog, isLoading:patientLogLoading } = useGetPatientLogsQuery({ id });

  const Logs = log === "doctor" ? doctorLog?.data : patientLog?.data

  const activity = Logs?.map((data: any) => {
    return {
      color: "green",
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
          spinning={doctorLogLoading || patientLogLoading}
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
