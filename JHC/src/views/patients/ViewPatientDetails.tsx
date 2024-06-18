import React, { useState } from "react";
import { user } from "../../assets";
import { Button, Divider, Spin } from "antd";
import { IPatient } from "../../interfaces/patientfee.interface";
import calcAge from "../../utils";
import { useGetPatientByIdQuery } from "../../api/patients.api";
import { LoadingOutlined } from "@ant-design/icons";
import ActivityLog from "../../components/activityLog/ActivityLog";

interface IPatientDetails {
  patient: IPatient;
}
export default function ViewPatientDetails({ patient }: IPatientDetails) {
  const [viewLogs, setViewLogs] = useState(false);
  const { data, isLoading } = useGetPatientByIdQuery({
    id: patient._id as string,
  });

  const patientDetails = data?.data;
  return (
    <div className="w-full bg-white">
      {isLoading ? (
        <div className="w-full py-12 flex justify-center items-center">
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      ) : (
        <>
          <div className="w-[200px] h-[200px] mx-auto border p-2 rounded-full">
            <img
              src={user}
              className="w-full h-full rounded-full object-contain"
              alt=""
            />
          </div>
          <Divider />
          <>
            {viewLogs ? (
              <ActivityLog log="patient" id={patient._id as string} />
            ) : (
              <div className="w-full px-12 flex justify-between items-start">
                <div>
                  <p className="font-bold py-1">Name</p>
                  <p className="font-bold py-1">Email</p>
                  <p className="font-bold py-1">Phone</p>
                  <p className="font-bold py-1">Age</p>
                  <p className="font-bold py-1">Gender</p>
                  <p className="font-bold py-1">Blood Group</p>
                  <p className="font-bold py-1">Genotype</p>
                </div>

                <div>
                  <p className="py-1">
                    {patientDetails.first_name} {patientDetails.last_name}
                  </p>
                  <p className="py-1">{patientDetails.email}</p>
                  <p className="py-1">{patientDetails.phone}</p>
                  <p className="py-1">{calcAge(patientDetails.DOB)}</p>
                  <p className="py-1">{patientDetails.gender || "-"}</p>
                  <p className="py-1">{patientDetails.blood_group}</p>
                  <p className="py-1">{patientDetails.genotype}</p>
                </div>
              </div>
            )}
          </>

          <Divider />
          <div className="w-full flex justify-center items-center">
            <Button type="primary" onClick={() => setViewLogs(!viewLogs)}>
              {viewLogs ? "Go Back" : "View Activity Log"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
