import Appointment from "./Appointment";
import ActivityView from "./ActivityView";
import Education from "./Education";
import Chart from "./Chart";
import PatienFee from "./PatienFee";

export default function DashBoard() {
  return (
    <div className="">
      <div className="w-full h-full flex justify-between items-center">
        <ActivityView />
        <Appointment />
      </div>
      <div className="w-full h-[20rem] flex justify-between items-center mt-8">
        <Education />
        <Chart />
        <PatienFee />
      </div>
    </div>
  );
}
