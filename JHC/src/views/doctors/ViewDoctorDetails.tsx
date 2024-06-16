import { IDoctor } from '../../interfaces/doctor.interface';
import calcAge from '../../utils';
import { Divider, Tag } from 'antd';
import { user } from '../../assets';

interface IViewDoctorDetailsModal {
  doctor: IDoctor
}
export default function ViewDoctorDetailsModal({doctor}:IViewDoctorDetailsModal) {
  return (
    <div className="w-full bg-white">
      <div className="w-[200px] h-[200px] mx-auto border p-2 rounded-full">
        <img src={user} className='w-full h-full rounded-full object-contain' alt="" />
      </div>
      <Divider/>
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
    </div>
  );
}
