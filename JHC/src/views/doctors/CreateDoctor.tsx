/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Input, Select, Switch } from "antd";
import { Units } from "../../constants/constants";
import { Controller, useForm } from "react-hook-form";
import {
  ICreateDoctor,
  IDoctor,
  IUpdateDoctor,
} from "../../interfaces/doctor.interface";
import {
  usePostDoctorMutation,
  useUpdateDoctorMutation,
  useValidateDoctorEmailMutation,
  useValidateDoctorPhoneMutation,
} from "../../api/doctors.api";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import _debounce from "lodash.debounce";
import { MdError } from "react-icons/md";
import dayjs from "dayjs";

interface ICreateDoctorOptions {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModify: boolean;
  correctDoctorObj: IDoctor;
}

export default function CreateDoctor({
  setOpenModal,
  isModify,
  correctDoctorObj,
}: ICreateDoctorOptions) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    setValue,
  } = useForm<ICreateDoctor | IUpdateDoctor>({
    mode: "onChange",
    defaultValues: {
      email: "",
      phone: "",
      first_name: "",
      last_name: "",
      DOB: null,
      is_consultant: false,
      unit: "",
      gender: "",
    },
  });

  const dob = dayjs(correctDoctorObj?.DOB).format("YYYY-MM-DD");

  useEffect(() => {
    if (isModify) {
      setValue("first_name", correctDoctorObj?.first_name);
      setValue("last_name", correctDoctorObj?.last_name);
      setValue("email", correctDoctorObj?.email);
      setValue("phone", correctDoctorObj?.phone);
      setValue("gender", correctDoctorObj?.gender);
      setValue("unit", correctDoctorObj?.unit);
      setValue("is_consultant", correctDoctorObj?.is_consultant);
      // Convert date string to dayjs object
      const dob_ = dayjs(dob);
      setValue("DOB", dob_);
    }
  }, [isModify, correctDoctorObj]);

  const [createDoctor, { data, isLoading, isSuccess }] =
    usePostDoctorMutation();

  const [
    updateDoctor,
    {
      data: update,
      isLoading: isUpdatingDoctor,
      isSuccess: isUpdateSuccessful,
    },
  ] = useUpdateDoctorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setOpenModal(false);
    } else if (isUpdateSuccessful) {
      toast.success(update?.message);
      setOpenModal(false);
    }
  }, [isSuccess, isUpdatingDoctor]);


  const handleCreateDoctor = async (value: ICreateDoctor) => {
    createDoctor(value)
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        toast.error(e?.data?.message);
      });
  };

  const handleUpdateDoctor = async (value: any) => {
    updateDoctor({ ...value, _id: correctDoctorObj._id as string })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        toast.error(e?.data?.message);
      });
  };

  const [validateEmail, { isLoading: validatingEmail }] =
    useValidateDoctorEmailMutation();
  const [validatePhone, { isLoading: validatingPhone }] =
    useValidateDoctorPhoneMutation();

  const [isEmailExisting, setIsEmailExisting] = useState<boolean | null>(null);
  const [isPhoneExisting, setIsPhoneExisting] = useState<boolean | null>(null);

  const checkUniqueness = _debounce((e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        validateEmail({ value })
          .unwrap()
          .then((res) => {
            setIsEmailExisting(res?.data);
          })
          .catch((_e) => {});
        break;
      case "phone":
        validatePhone({ value })
          .unwrap()
          .then((res) => {
            setIsPhoneExisting(res?.data);
          })
          .catch((_e) => {});
        break;
      default:
        break;
    }
  }, 2000);

  return (
    <form
      onSubmit={handleSubmit(
        correctDoctorObj ? handleUpdateDoctor : handleCreateDoctor
      )}
    >
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
                disabled={correctDoctorObj !== undefined}
                onKeyUp={checkUniqueness}
                status={errors.email || isEmailExisting ? "error" : undefined}
                placeholder={errors.email ? errors.email.message : "Email"}
                {...field}
                className={`${
                  errors.email ? "placeholder:text-red-400" : ""
                } w-full h-10`}
                addonAfter={
                  validatingEmail ? (
                    <Spin indicator={<LoadingOutlined spin />} />
                  ) : isEmailExisting ? (
                    <MdError color="#FF6558" />
                  ) : null
                }
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
                onKeyUp={checkUniqueness}
                status={errors.phone || isPhoneExisting ? "error" : undefined}
                placeholder={errors.phone ? errors.phone.message : "Phone"}
                {...field}
                className={`${
                  errors.phone && "placeholder:text-red-400"
                } w-full h-10`}
                addonAfter={
                  validatingPhone ? (
                    <Spin indicator={<LoadingOutlined spin />} />
                  ) : isPhoneExisting ? (
                    <MdError color="#FF6558" />
                  ) : null
                }
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
            name="unit"
            control={control}
            render={({ field }) => (
              <Select
                status={errors.unit && "error"}
                {...field}
                placeholder={errors.unit ? errors.unit.message : "Unit"}
                options={Units}
                className="w-full h-10"
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                className="w-full h-10"
              />
            )}
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
                // onChange={onChange}
              />
            )}
          />
          <div className="flex justify-start items-center gap-2 flex-row-reverse">
            <p className="text-sm">Consultant</p>
            <Controller
              name="is_consultant"
              control={control}
              render={({ field }) => <Switch size="small" {...field} />}
            />
          </div>
        </div>
      </div>
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
          disabled={correctDoctorObj ? !isValid : !isDirty}
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
        </button>
      </div>
    </form>
  );
}
