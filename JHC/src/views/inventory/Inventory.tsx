/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, Space, Table, TableProps } from "antd";
import Filter from "../../components/filters/Filter";
import InventoryHeader from "./InventoryHeader";
import { Icons } from "../../components/icons";
import { useGetProductsQuery } from "../../api/products.api";
import { useState } from "react";
import { IProduct } from "../../interfaces/inventory.interface";
import CreateProduct from "./CreateProduct";
import CustomPagination from "../../components/pagination/CustomPagination";

export default function Inventory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<string>("in stock");
  const [manufacturer, setManufacturer] = useState<string>('');

  console.log("category", category);

  const { data, isLoading } = useGetProductsQuery({
    page: currentPage,
    search: searchText,
    category: category,
    stock: stock,
    manufacturer: manufacturer
  });

  const columns: TableProps<IProduct>["columns"] = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price (Per Pack)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "In Stock",
      dataIndex: "quantity",
      key: "stock_count",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry_date",
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
      <InventoryHeader setOpenModal={setOpenModal} />
      <Filter
        showDropdown
        setSearch={setSearchText}
        setCategory={setCategory}
        setStock={setStock}
        setManufacturer={setManufacturer}
      />
      <div className="mt-12">
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          loading={isLoading}
        />
      </div>

      <div className="w-full py-8 flex justify-end items-center">
        <CustomPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={data?.meta?.total as number}
        />
      </div>

      <Modal
        title="Create new product"
        style={{ top: 20 }}
        open={openModal}
        footer={null}
        centered
        className="!w-[50vw]"
        closable
        onCancel={() => setOpenModal(false)}
      >
        <CreateProduct setOpenModal={setOpenModal} />
      </Modal>
    </div>
  );
}
