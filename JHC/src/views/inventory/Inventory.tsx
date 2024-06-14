/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Table, TableProps } from "antd";
import Filter from "../../components/filters/Filter";
import InventoryHeader from "./InventoryHeader";
import { Icons } from "../../components/icons";
import { drugsArr } from "../../constants/constants";

export interface InventorydataType {
  // key: string;
  productName: string;
  type: string;
  price: number;
  stockCount: number;
  expiryDate: string;
  manufacturer: string;
}
export default function Inventory() {
      const columns: TableProps<InventorydataType>["columns"] = [
        {
          title: "Product Name",
          dataIndex: "productName",
          key: "product_name",
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Price (Per Pack)",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "In Stock",
          dataIndex: "stockCount",
          key: "stock_count",
        },
        {
          title: "Expiry Date",
          dataIndex: "expiryDate",
          key: "expiryDate",
        },
        {
          title: "Manufacturer",
          dataIndex: "manufacturer",
          key: "manufacturer",
        },
        {
          title: "User Action",
          key: "action",
          render: (_) => (
            <Space size="middle" className="">
              <div className="w-6 flex justify-center items-center h-6 rounded-lg bg-JHC-Primary cursor-pointer">
                <Icons.chat />
              </div>
              <div className="w-6 h-6 rounded-lg border flex justify-center items-center border-JHC-Red cursor-pointer">
                <Icons.cancel />
              </div>
              <div className="w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer  border-JHC-Primary">
                <Icons.info />
              </div>
            </Space>
          ),
        },
      ];
  return (
    <div className="w-full p-5 bg-white h-screen border rounded-lg">
      <InventoryHeader />
      <Filter showDropdown />
      <div className="mt-24 h-[60vh]">
        <Table columns={columns} dataSource={drugsArr} />
      </div>
    </div>
  );
}
