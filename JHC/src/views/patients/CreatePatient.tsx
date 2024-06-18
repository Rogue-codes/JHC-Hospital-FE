import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ICreatePatient } from "../../interfaces/patientfee.interface";
import { Button, DatePicker, Input, Select, Spin, Upload } from "antd";
import { blood_group, genotype } from "../../constants/constants";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { usePostPatientMutation } from "../../api/patients.api";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { capitalizeWord } from "../../utils";

interface ICreatePatientModal {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CreatePatient({ setOpenModal }: ICreatePatientModal) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
  } = useForm<ICreatePatient>({
    mode: "onChange",
    defaultValues: {
      email: "",
      phone: "",
      first_name: "",
      last_name: "",
      DOB: null,
      gender: "",
      blood_group: "",
      genotype: "",
      password: "simple@123",
    },
  });

// const uploadProps: UploadProps = {
//   onRemove: (file: UploadFile<any>) => {
//     setFileList((prevFileList) => {
//       const newFileList = prevFileList.filter((item) => item.uid !== file.uid);
//       return newFileList;
//     });
//   },
//   beforeUpload: (file: UploadFile<any>) => {
//     setFileList([file]);
//     // Set the complete File object to patient_img
//     setValue("patient_img", file);
//     return false; // Prevent default upload behavior
//   },
//   fileList,
// };


  const [createDoctor, { data, isLoading, isSuccess }] =
    usePostPatientMutation();

  const handleCreatePatient = async (value: ICreatePatient) => {
    console.log('formvalue', value)
    createDoctor(value)
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        toast.error(e?.data?.message);
      });
  };
  return (
    <form onSubmit={handleSubmit(handleCreatePatient)}>
      <div className="w-full bg-white">
        <div className="w-full flex my-8 justify-between items-center gap-5">
          <Controller
            name="first_name"
            control={control}
            rules={{
              required: "First name is required",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "text/character not supported",
              },
            }}
            render={({ field }) => (
              <Input
                status={errors.first_name && "error"}
                placeholder={
                  errors.first_name ? errors.first_name.message : "First Name"
                }
                {...field}
                className={`${
                  errors.first_name && "placeholder:text-red-400"
                } w-full h-10`}
              />
            )}
          />

          <Controller
            name="last_name"
            control={control}
            rules={{
              required: "Last name is required",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "text/character not supported",
              },
            }}
            render={({ field }) => (
              <Input
                status={errors.last_name && "error"}
                placeholder={
                  errors.last_name ? errors.last_name.message : "Last Name"
                }
                {...field}
                className={`${
                  errors.last_name && "placeholder:text-red-400"
                } w-full h-10`}
              />
            )}
          />
        </div>

        <div className="w-full flex my-8 justify-between items-center gap-5">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                // onKeyUp={checkUniqueness}
                status={errors.email ? "error" : undefined}
                placeholder={errors.email ? errors.email.message : "Email"}
                {...field}
                className={`${
                  errors.email ? "placeholder:text-red-400" : ""
                } w-full h-10`}
                // addonAfter={
                //   validatingEmail ? (
                //     <Spin indicator={<LoadingOutlined spin />} />
                //   ) : isEmailExisting ? (
                //     <MdError color="#FF6558" />
                //   ) : null
                // }
              />
            )}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            }}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                // onKeyUp={checkUniqueness}
                status={errors.phone ? "error" : undefined}
                placeholder={errors.phone ? errors.phone.message : "Phone"}
                {...field}
                className={`${
                  errors.phone && "placeholder:text-red-400"
                } w-full h-10`}
                // addonAfter={
                //   validatingPhone ? (
                //     <Spin indicator={<LoadingOutlined spin />} />
                //   ) : isPhoneExisting ? (
                //     <MdError color="#FF6558" />
                //   ) : null
                // }
              />
            )}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\+?[0-9]{11,15}$/,
                message:
                  "Invalid phone number. Please enter 10 to 15 digits (0-9) and optionally start with a +.",
              },
            }}
          />
        </div>

        <div className="w-full my-8 h-10 flex justify-between items-center gap-5">
          <Controller
            name="blood_group"
            control={control}
            render={({ field }) => (
              <Select
                status={errors.blood_group && "error"}
                {...field}
                placeholder={
                  errors.blood_group
                    ? errors.blood_group.message
                    : "Blood Group"
                }
                options={blood_group}
                className="w-full h-10"
              />
            )}
            rules={{
              required: "Blood group is required",
            }}
          />

          <Controller
            name="genotype"
            control={control}
            render={({ field }) => (
              <Select
                status={errors.blood_group && "error"}
                {...field}
                placeholder={
                  errors.blood_group
                    ? errors.blood_group.message
                    : "Blood Group"
                }
                options={genotype}
                className="w-full h-10"
              />
            )}
            rules={{
              required: "Genotype is required",
            }}
          />
        </div>

        <div className="w-full my-8 h-12 flex justify-start items-center gap-5">
          <Controller
            name="DOB"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                placeholder="DOB"
                className="border w-1/2 h-10"
              />
            )}
            rules={{
              required: "Date of birth is required",
            }}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                className="w-[50%] h-10"
              />
            )}
            rules={{
              required: "Gender is required",
            }}
          />
        </div>
      </div>

      {/* <div className="w-full flex justify-center items-center">
        <Controller
          name="patient_img"
          control={control}
          render={({ field }) => (
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          )}
        />{" "}
      </div> */}
      <div className="w-full flex justify-end items-center gap-5">
        <button
          type="button"
          className="border border-JHC-Primary text-JHC-Primary p-1 hover:scale-110 transition-all px-6 rounded-lg"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!isValid}
          className="bg-JHC-Primary text-white p-1 disabled:opacity-50 disabled:cursor-not-allowed border border-JHC-Primary hover:scale-110 transition-all px-6 rounded-lg"
        >
          {isLoading ? (
            <Spin
              className="text-white"
              indicator={<LoadingOutlined spin color="white" />}
            />
          ) : (
            "Create"
          )}
        </button>

        {/* <button
          type="submit"
          // disabled={correctDoctorObj ? !isValid : !isDirty}
          className="bg-JHC-Primary text-white p-1 disabled:opacity-50 disabled:cursor-not-allowed border border-JHC-Primary hover:scale-110 transition-all px-6 rounded-lg"
        >
          {isLoading || isUpdatingDoctor ? (
            <Spin
              className="text-white"
              indicator={<LoadingOutlined spin color="white" />}
            />
          ) : correctDoctorObj ? (
            "Modify"
          ) : (
            "Create"
          )}
        </button> */}
      </div>
    </form>
  );
}
