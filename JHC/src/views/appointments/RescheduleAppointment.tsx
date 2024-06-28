import { Button, DatePicker, Divider, Space, Spin } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useRescheduleAppointmentMutation } from "../../api/reservation.api";
import { toast } from "react-toastify";
import { IAppointment } from "../../interfaces/appointment.interface";
import { LoadingOutlined } from "@ant-design/icons";

interface IRescheduleAppointment {
  selectedAppointment: IAppointment | null;
  setRescheduleAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RescheduleAppointment({
  selectedAppointment,
  setRescheduleAppointmentModal,
}: IRescheduleAppointment) {
  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(
    selectedAppointment ? dayjs(selectedAppointment.time) : null
  );

  // Update datePickerValue whenever selectedAppointment changes
  useEffect(() => {
    setDatePickerValue(
      selectedAppointment ? dayjs(selectedAppointment.time) : null
    );
  }, [selectedAppointment]);

  const onOk = (value: any) => {
    setDatePickerValue(value); // Update state
  };

  const [rescheduleAppointment, { isLoading, data, isSuccess }] =
    useRescheduleAppointmentMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setRescheduleAppointmentModal(false);
    }
  }, [isSuccess]);

  const handleRescheduleAppointment = () => {
    if (!datePickerValue) return;

    const payload = {
      time: datePickerValue.toISOString(),
      id: selectedAppointment?._id as string,
    };

    console.log("Payload to be sent:", payload); // Debugging log

    rescheduleAppointment(payload)
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        toast.error(e?.data?.message);
      });
  };

  return (
    <>
      <div className="w-full flex justify-center items-center p-8 bg-white">
        <Space direction="vertical" size={12}>
          <DatePicker
            showTime
            value={datePickerValue}
            onChange={(value) => {
              const formattedDate = value
                ? dayjs(value.toString()).format("YYYY-MM-DDTHH:mm:ss[Z]")
                : "";
              console.log("Selected Time: ", value);
              console.log("Formatted Selected Time: ", formattedDate);
              setDatePickerValue(value); // Update state
            }}
            onOk={onOk}
            className="!w-full h-10 my-8"
          />
        </Space>
      </div>
      <Divider />
      <div className="flex justify-end items-center gap-5">
        <Button
          type="default"
          onClick={() => setRescheduleAppointmentModal(false)}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          disabled={
            datePickerValue?.isSame(dayjs(selectedAppointment?.time)) ?? false
          }
          onClick={handleRescheduleAppointment}
        >
          {isLoading ? (
            <Spin
              className="text-white"
              indicator={<LoadingOutlined spin color="white" />}
            />
          ) : (
            "Reschedule"
          )}
        </Button>
      </div>
    </>
  );
}
