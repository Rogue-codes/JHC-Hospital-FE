import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ICreateAppointment } from "../../interfaces/appointment.interface";
import { Button, DatePicker, Select, Space, Spin } from "antd";
import { useSearchPatientsQuery } from "../../api/patients.api";
import { useGetActiveDoctorsQuery } from "../../api/doctors.api";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useCreateAppointmentMutation } from "../../api/reservation.api";
import { toast } from "react-toastify";

interface ICreateAppointmentComponent {
  setCreateAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateAppointment({
  setCreateAppointmentModal,
}: ICreateAppointmentComponent) {
  const defaultValue = {
    patient: "",
    doctor: "",
    time: "",
  };

  const [datePickerValue, setDatePickerValue] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    watch,
    reset,
  } = useForm<ICreateAppointment>({
    mode: "onChange",
    defaultValues: defaultValue,
  });

  const { data } = useSearchPatientsQuery({
    search: "",
  });

  const { data: doctorsData } = useGetActiveDoctorsQuery({});

  const patients = data?.data?.map((patient: any) => {
    return {
      value: patient._id,
      label: patient.first_name + " " + patient.last_name,
    };
  });

  const doctors = doctorsData?.data?.map((doctor: any) => {
    return {
      value: doctor._id,
      label: doctor.first_name + " " + doctor.last_name,
    };
  });

  const onOk = (value: any) => {
    setValue("time", value as string);
    setDatePickerValue(value); // Update state
  };

  const [createAppointment, { isLoading: creatingAppointment, isSuccess }] =
    useCreateAppointmentMutation();

  const handleCreateAppointment = async (value: ICreateAppointment) => {
    createAppointment(value)
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        toast.error(e?.data?.message);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Appointment created successfully");
      setCreateAppointmentModal(false);
      reset();
      setDatePickerValue(null); // Reset date picker value
    }
  }, [isSuccess]);

  const { time } = watch();

  return (
    <form onSubmit={handleSubmit(handleCreateAppointment)}>
      <div className="w-full">
        <div className="w-full my-8 h-10 flex justify-between items-center gap-5">
          <div className="w-full h-10">
            <label htmlFor="">Patient</label>
            <Controller
              name="patient"
              control={control}
              render={({ field }) => (
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  {...field}
                  placeholder="Select a person"
                  options={patients}
                  className="w-full h-10"
                />
              )}
              rules={{
                required: "Patient is required",
              }}
            />
          </div>

          <div className="w-full h-10">
            <label htmlFor="">Doctor</label>
            <Controller
              name="doctor"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  placeholder="Select a doctor"
                  options={doctors}
                  className="w-full h-10"
                />
              )}
              rules={{
                required: "Doctor is required",
              }}
            />
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-5">
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
      </div>

      <div className="w-full mt-5 flex justify-end items-center gap-5">
        <Button
          type="default"
          className="border border-JHC-Primary text-JHC-Primary p-1 hover:scale-110 transition-all px-6 rounded-lg"
          onClick={() => setCreateAppointmentModal(false)}
        >
          Cancel
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          disabled={!isValid || time === ""}
          className="bg-JHC-Primary text-white p-1 disabled:opacity-50 disabled:cursor-not-allowed border border-JHC-Primary hover:scale-110 transition-all px-6 rounded-lg"
        >
          {creatingAppointment ? (
            <Spin
              className="text-white"
              indicator={<LoadingOutlined spin color="white" />}
            />
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
}
