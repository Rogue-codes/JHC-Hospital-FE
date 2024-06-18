import calcAge from "../../utils";
import { ConfigProvider, Divider, Popconfirm, Spin, Tag } from "antd";
import { user } from "../../assets";
import { FaRegEdit } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { IDoctor } from "../../interfaces/doctor.interface";
import { FcCancel } from "react-icons/fc";
import { useChangeDoctorStatusMutation } from "../../api/doctors.api";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import ActivityLog from "../../components/activityLog/ActivityLog";

interface IViewDoctorDetailsModal {
  doctor: IDoctor;
  isLoading: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setViewDoctorDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ViewDoctorDetailsModal({
  doctor,
  setOpenModal,
  setViewDoctorDetails,
  setIsModify,
  isLoading,
}: IViewDoctorDetailsModal) {
  const handleModify = () => {
    setViewDoctorDetails(false);
    setOpenModal(true);
    setIsModify(true);
  };

  const text = `Are you sure to ${
    doctor?.is_active ? "Deactivate" : "Reactivate"
  } ${doctor?.first_name} ${doctor?.last_name}?`;
  const description = `Doctor will become ${
    doctor?.is_active ? "inactive" : "active"
  }`;
  const buttonWidth = 80;

  const [changeStatus, { isLoading: changingDoctorStatus }] =
    useChangeDoctorStatusMutation();

  const handleChangeStatus = (doctor: IDoctor) => {
    changeStatus({ id: doctor._id as string })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message);
      });
  };

  const [viewActivityLog, setViewActivityLog] = useState(false);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-44 flex justify-center items-center">
          {/* <Spin
            indicator={<LoadingOutlined spin style={{ color: "white" }} />}
          /> */}
          <p>loading...</p>
        </div>
      ) : (
        <div className="w-full bg-white">
          <div className="w-[200px] h-[200px] mx-auto border p-2 rounded-full">
            <img
              src={user}
              className="w-full h-full rounded-full object-contain"
              alt=""
            />
          </div>
          <Divider />

          {viewActivityLog ? (
            <div className="w-full h-64 overflow-y-scroll p-12">
              <ActivityLog log="doctor" id={doctor._id as string}/>
            </div>
          ) : (
            <div className="w-[80%] mx-auto">
              <div className="w-full flex justify-between my-3 items-center">
                <p className="font-bold text-md">Name:</p>
                <p>
                  {doctor.first_name} {doctor.last_name}
                </p>
              </div>

              <div className="w-full flex justify-between my-3 items-center">
                <p className="font-bold text-md">Gender:</p>
                <p className="capitalize">{doctor.gender}</p>
              </div>

              <div className="w-full flex justify-between my-3 items-center">
                <p className="font-bold text-md">Age:</p>
                <p>{calcAge(doctor.DOB)}</p>
              </div>

              <div className="w-full flex justify-between my-3 items-center">
                <p className="font-bold text-md">Email:</p>
                <p>{doctor.email}</p>
              </div>

              <div className="w-full flex justify-between my-3 items-center">
                <p className="font-bold text-md">Phone:</p>
                <p>{doctor.phone}</p>
              </div>

              <div className="w-full flex justify-between my-3 items-center">
                <p className="font-bold text-md">Unit:</p>
                <p>{doctor.unit}</p>
              </div>

              <div className="w-full flex justify-between my-3 items-center">
                <p className="font-bold text-md">Status:</p>
                <Tag color={doctor.is_active ? "#47C96B" : "#8787A8"}>
                  {doctor.is_active ? "Active" : "Inactive"}
                </Tag>
              </div>

              <div className="w-full flex justify-between my-3 items-center">
                <p className="font-bold text-md">Is a Consultant:</p>
                <p>{doctor.is_consultant ? "Yes" : "No"}</p>
              </div>

              <div className="w-full flex justify-between items-center">
                <p className="font-bold text-md">Joined:</p>
                <p>
                  {doctor.createdAt
                    ? new Date(doctor.createdAt).getFullYear()
                    : "N/A"}
                </p>
              </div>
            </div>
          )}

          <Divider />
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start gap-5">
              <button
                className="flex justify-start gap-1 items-center"
                onClick={handleModify}
              >
                <FaRegEdit color="#D4A62F" />
                Modify
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
                  onConfirm={() => handleChangeStatus(doctor)}
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                  <button className="flex justify-start gap-1 items-center">
                    {doctor.is_active ? (
                      <FcCancel color="red" size={20} />
                    ) : (
                      <IoMdSend color="#2FB755" />
                    )}
                    {doctor.is_active ? "Deactivate" : "Reactivate"}
                  </button>
                </Popconfirm>
              </ConfigProvider>
            </div>
            <p
              className="text-JHC/Medium underline cursor-pointer"
              onClick={() => setViewActivityLog(true)}
            >
              View Activity Log
            </p>
          </div>

          <Spin
            spinning={changingDoctorStatus}
            indicator={<LoadingOutlined spin />}
            fullscreen
          />
        </div>
      )}
    </>
  );
}
