import { Table } from "antd";
import { useState } from "react";
import { appointmentArr } from "../../constants/constants";

export default function Appointment() {
  const [activetab, setActivetab] = useState(0);
  const column = [
    {
      title: " Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: " Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: " Patient Name",
      dataIndex: "patientName",
      key: "patient_name",
    },
    {
      title: " Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
  ];

  const tabs = ["NEW APPOINTMENTS", "COMPLETED APPOINTMENTS"];
  return (
    <div className="w-[53vw] h-[20rem] p-4 bg-white">
      <div className="flex justify-start items-center gap-4 mb-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${
              activetab === index
                ? "border-b-2 border-JHC-Primary font-bold"
                : ""
            } pb-1 text-sm transition-all text-JHC/Darkest cursor-pointer`}
            onClick={() => setActivetab(index)}
          >
            <p>{tab}</p>
          </div>
        ))}
      </div>
      <div className="h-[15rem] overflow-y-scroll">
        <Table
          columns={column}
          dataSource={appointmentArr}
          pagination={false}
        />
      </div>
    </div>
  );
}
