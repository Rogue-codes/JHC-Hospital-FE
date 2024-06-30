import { Button } from "antd";

interface IInventoryHeader {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function InventoryHeader({ setOpenModal }: IInventoryHeader) {
  return (
    <div className="px-2 w-full relative justify-between items-end pb-3 border-b-2 border-[#CFCFCF] flex">
      <p className="text-md font-semibold">MEDICINE INVENTORY</p>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        Add Product
      </Button>
      <div className="w-44 border-b-2 h-2 border-JHC-Primary absolute left-0 -bottom-[1px]"></div>
    </div>
  );
}
