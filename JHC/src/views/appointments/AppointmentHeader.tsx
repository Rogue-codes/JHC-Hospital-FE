import PrimaryButton from "../../components/buttons/PrimaryButton";

interface IAppointmentHeader {
  tabs: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
export default function AppointmentHeader({
  activeTab,
  tabs,
  setActiveTab,
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
      <PrimaryButton label="New Appointment" />
      <div
        className={`${
          activeTab === 0 ? "left-0 w-44" : "left-[17%] w-64"
        } transition-all border-b-2 h-2 border-JHC-Primary absolute  -bottom-[1px]`}
      ></div>
    </div>
  );
}
