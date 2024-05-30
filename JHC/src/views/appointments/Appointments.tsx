import { useState } from "react";
import AppointmentHeader from "./AppointmentHeader";

export default function Appointments() {
  const [activeTab,setActiveTab] = useState(0)

  const tabs = ["NEW APPOINTMENTS", "COMPLETED APPOINTMENTS"];
  return (
    <div className="w-full h-screen">
      <AppointmentHeader activeTab={activeTab} tabs={tabs} setActiveTab={setActiveTab} />
    </div>
  );
}
