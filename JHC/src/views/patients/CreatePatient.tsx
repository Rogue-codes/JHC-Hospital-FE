import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ICreatePatient,
  IPatient,
  IUpdatePatient,
} from "../../interfaces/patientfee.interface";
import { Button, DatePicker, Divider, Input, Select, Spin } from "antd";
import { blood_group, genotype } from "../../constants/constants";
import {
  usePostPatientMutation,
  useUpdatePatientMutation,
  useValidatePatientEmailMutation,
  useValidatePatientPhoneMutation,
} from "../../api/patients.api";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import _debounce from "lodash.debounce";
import { MdError } from "react-icons/md";
import dayjs from "dayjs";
import _omit from "lodash/omit";

interface ICreatePatientModal {
  correctPatientObj: IPatient;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreatePatient({
  setOpenModal,
  correctPatientObj,
}: ICreatePatientModal) {
  const [uploadingImage, _setUploadingImage] = useState(false);
  const createPatientObject = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    blood_group: "",
    genotype: "",
    DOB: null,
    password: "simple@123",
  };
  const updatePatientObject = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    blood_group: "",
    genotype: "",
    DOB: null,
  };
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
    reset,
  } = useForm<ICreatePatient>({
    mode: "onChange",
    defaultValues: correctPatientObj
      ? updatePatientObject
      : createPatientObject,
  });

  const dob = dayjs(correctPatientObj?.DOB).format("YYYY-MM-DD");

  useEffect(() => {
    if (correctPatientObj) {
      setValue("first_name", correctPatientObj?.first_name);
      setValue("last_name", correctPatientObj?.last_name);
      setValue("email", correctPatientObj?.email);
      setValue("phone", correctPatientObj?.phone);
      setValue("gender", correctPatientObj?.gender);
      setValue("blood_group", correctPatientObj?.blood_group);
      setValue("genotype", correctPatientObj?.genotype);
      // Convert date string to dayjs object
      const dob_ = dayjs(dob);
      setValue("DOB", dob_);
    }
  }, [correctPatientObj]);

  const formValues = watch();

  const [createDoctor, { isLoading }] = usePostPatientMutation();
  const [
    updatePatient,
    {
      data: update,
      isLoading: isUpdatingPatient,
      isSuccess: isUpdateSuccessful,
    },
  ] = useUpdatePatientMutation();

  useEffect(() => {
    if (isUpdateSuccessful) {
      toast.success(update?.message);
      setOpenModal(false);
    }
  }, [isUpdateSuccessful]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setValue("patient_img", file, {
        shouldValidate: true,
      });
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", formValues?.patient_img);
      formData.append("upload_preset", "JHC-hospital"); // Correct the preset name

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/osuji/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const imgObj = await res.json();
      return imgObj.secure_url.toString();
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleCreatePatient = async (data: ICreatePatient) => {
    let imageURL;

    // Check if an image file is provided
    if (formValues.patient_img) {
      try {
        imageURL = await handleImageUpload();
        setValue("patient_img", imageURL, {
          shouldValidate: true,
        });
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
    }

    // Create updated data object, including image URL if available
    const updatedData = imageURL
      ? { ...data, patient_img: imageURL }
      : { ...data };

    try {
      await createDoctor(updatedData).unwrap();
      toast.success("Patient created successfully");
      reset();
      setOpenModal(false);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.data?.message);
    }
  };

  const handleUpdatePatient = async (data: IUpdatePatient) => {
    let imageURL;

    // Check if an image file is provided
    if (formValues.patient_img) {
      try {
        imageURL = await handleImageUpload();
        setValue("patient_img", imageURL, {
          shouldValidate: true,
        });
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
    }

    // Create updated data object, including image URL if available
    let updatedData = imageURL
      ? { ...data, patient_img: imageURL }
      : { ...data };

    // Remove the password field from the updatedData object
    updatedData = _omit(updatedData, ["password"]);

    try {
      await updatePatient({
        payload: updatedData,
        id: correctPatientObj._id as string,
      }).unwrap();
      toast.success("Patient updated successfully");
      reset();
      setOpenModal(false);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.data?.message);
    }
  };

  const [validateEmail, { isLoading: validatingEmail }] =
    useValidatePatientEmailMutation();
  const [validatePhone, { isLoading: validatingPhone }] =
    useValidatePatientPhoneMutation();

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
        correctPatientObj ? handleUpdatePatient : handleCreatePatient
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
                message: "Text/character not supported",
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
                message: "Text/character not supported",
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
                disabled={!!correctPatientObj}
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
                status={errors.genotype && "error"}
                {...field}
                placeholder={
                  errors.genotype ? errors.genotype.message : "Genotype"
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
                placeholder="Gender"
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

      <div className="w-full flex justify-center items-center">
        <Controller
          name="patient_img"
          control={control}
          render={() => (
            <Input
              type="file"
              onChange={handleFileChange}
              className="w-[50%] h-10"
            />
          )}
        />
      </div>

      <Divider />

      <div className="w-full mt-5 flex justify-end items-center gap-5">
        <Button
          type="default"
          className="border border-JHC-Primary text-JHC-Primary p-1 hover:scale-110 transition-all px-6 rounded-lg"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          disabled={correctPatientObj ? !isValid : !isDirty}
          className="bg-JHC-Primary text-white p-1 disabled:opacity-50 disabled:cursor-not-allowed border border-JHC-Primary hover:scale-110 transition-all px-6 rounded-lg"
        >
          {isLoading || uploadingImage || isUpdatingPatient ? (
            <Spin
              className="text-white"
              indicator={<LoadingOutlined spin color="white" />}
            />
          ) : correctPatientObj ? (
            "Modify"
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
}
