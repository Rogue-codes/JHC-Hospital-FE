import { Button } from "antd";
import { BiPlus } from "react-icons/bi";

interface IAppointmentHeader {
  tabs: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setCreateAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AppointmentHeader({
  activeTab,
  tabs,
  setActiveTab,
  setCreateAppointmentModal,
}: IAppointmentHeader) {
  return (
    <div className="px-2 w-full relative justify-between items-end pb-3 border-b-2 border-[#CFCFCF] flex">
      <div className="flex justify-start gap-5 items-center">
        {tabs.map((tab, index) => (
          <div className="cursor-pointer" onClick={() => setActiveTab(index)}>
            <p className="text-md font-semibold" key={index}>
              {tab}
            </p>
          </div>
        ))}
      </div>
      <Button
        className="flex justify-between items-center"
        type="primary"
        icon={<BiPlus size={20} />}
        onClick={() => setCreateAppointmentModal(true)}
      >
        New Appointment
      </Button>
      <div
        className={`${
          activeTab === 0 ? "left-0 w-44" : "left-[17%] w-64"
        } transition-all border-b-2 h-2 border-JHC-Primary absolute  -bottom-[1px]`}
      ></div>
    </div>
  );
}
