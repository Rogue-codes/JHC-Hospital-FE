import { Icons } from "../../components/icons";
import ActivityCards from "./dashboardComponents/ActivityCards";

export default function ActivityView() {
  return (
    <div className="w-[23rem] h-[20rem] bg-white flex justify-between flex-wrap items-center px-12">
      <div className="w-full flex justify-between items-center mt-3">
        <p className="text-JHC/Darkest font-semibold">Activity Overview</p>
        <div className="flex justify-center items-center gap-3">
          <p>Weekly</p>
          <Icons.dropdown className="cursor-pointer" />
        </div>
      </div>
      <ActivityCards
        icon={<Icons.activitydark />}
        label="Appointments"
        value={100}
        position={1}
      />
      <ActivityCards
        icon={<Icons.patientdark />}
        label="New Patients"
        value={50}
        position={2}
      />
      <ActivityCards
        icon={<Icons.medicine />}
        label="Medicines Sold"
        value={500}
        position={3}
      />
      <ActivityCards
        icon={<Icons.lab />}
        label="Lab Tests"
        value={100}
        position={4}
      />
    </div>
  );
}
