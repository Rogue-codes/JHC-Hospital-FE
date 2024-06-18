import { Button } from "antd";
import { BiPlus } from "react-icons/bi";

interface IDoctorHeader {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DoctorHeader({ setOpenModal }: IDoctorHeader) {
  return (
    <div className="px-2 w-full relative justify-between items-end pb-3 border-b-2 border-[#CFCFCF] flex">
      <p className="text-md font-semibold">Doctor Info</p>
      <Button
        type="primary"
        className="flex justify-between items-center"
        onClick={() => setOpenModal(true)}
        icon={<BiPlus size={20} />}
      >
        New Doctor
      </Button>
      <div className="w-44 border-b-2 h-2 border-JHC-Primary absolute left-0 -bottom-[1px]"></div>
    </div>
  );
}
