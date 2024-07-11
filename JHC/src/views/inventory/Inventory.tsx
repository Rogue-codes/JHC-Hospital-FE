/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Space,
  Table,
  TableProps,
} from "antd";
import Filter from "../../components/filters/Filter";
import InventoryHeader from "./InventoryHeader";
import { Icons } from "../../components/icons";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useIncreaseStockMutation,
} from "../../api/products.api";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/inventory.interface";
import CreateProduct from "./CreateProduct";
import CustomPagination from "../../components/pagination/CustomPagination";
import DropdownComponent from "../../components/dropdown/Dropdown";
import CreateBulkProducts from "./CreateBulkProducts";
import ViewProductDetails from "./ViewProductDetails";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

export default function Inventory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<string>("in stock");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  console.log("manufacturer", manufacturer);

  const { data, isLoading } = useGetProductsQuery({
    page: currentPage,
    search: searchText,
    category: category,
    stock: stock,
    manufacturer: manufacturer ? manufacturer : "",
  });

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [showViewProductModal, setShowViewProductModal] =
    useState<boolean>(false);
  const [count, setCount] = useState(0);
  const handleViewProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setShowViewProductModal(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setShowViewProductModal(false);
  };

  const [deleteProduct, { data: response, isLoading: isDeleting, isSuccess }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(response?.message);
    }
  }, [isSuccess]);

  const handleDeleteProduct = () => {
    deleteProduct({ id: selectedProduct?._id as string })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        toast.error(e?.data?.message);
      });
  };

  const handleModifyProduct = () => {
    setOpenModal(true);
    setShowViewProductModal(false);
    setSelectedOption("single");
  };

  const [increaseStock, { data: increasedStock, isSuccess: isIncreased }] =
    useIncreaseStockMutation();

  useEffect(() => {
    if (isIncreased) {
      toast.success(increasedStock?.message);
      setCount(0);
      setSelectedProduct(null);
    }
  }, [isIncreased]);

  const handleStockIncrease = () => {
    console.log("id", selectedProduct?._id);
    increaseStock({
      id: selectedProduct?._id as string,
      count: count.toString(),
    })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        toast.error(e?.data?.message);
      });
  };

  const text = `Are you sure you want to delete ${selectedProduct?.name} ?`;
  const description = `Product will be removed from the inventory`;
  const buttonWidth = 80;

  const content = (
    <div className="flex justify-center items-center gap-4">
      <Input
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
        type="number"
        className="w-[50%]"
      />
      <Button type="primary" onClick={handleStockIncrease}>
        Add
      </Button>
    </div>
  );

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
      render: (_, row) => (
        <Space size="middle" className="">
          <Popover
            content={content}
            open={selectedProduct?._id === row._id}
            title="Increase stock"
            trigger="click"
          >
            <div
              className="w-6 flex justify-center items-center h-6 rounded-lg bg-JHC-Primary cursor-pointer"
              onClick={() => setSelectedProduct(row)}
            >
              <Icons.chat />
            </div>
          </Popover>
          <ConfigProvider
            button={{
              style: { width: buttonWidth, margin: 4 },
            }}
          >
            <Popconfirm
              placement="bottom"
              title={text}
              description={description}
              arrow
              okText={isDeleting ? "loading..." : "Yes"}
              cancelText="No"
              onConfirm={handleDeleteProduct}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <div
                className="w-6 h-6 rounded-lg border flex justify-center items-center border-JHC-Red cursor-pointer"
                onClick={() => setSelectedProduct(row)}
              >
                <Icons.cancel />
              </div>
            </Popconfirm>
          </ConfigProvider>

          <div
            className="w-6 h-6 rounded-lg border flex justify-center items-center cursor-pointer  border-JHC-Primary"
            onClick={() => handleViewProduct(row)}
          >
            <Icons.info />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full p-5 bg-white h-screen border rounded-lg">
      <div className="flex border-b-2 border-[#CFCFCF]">
        <InventoryHeader />
        <DropdownComponent
          setOpenModal={setOpenModal}
          setSelectedOption={setSelectedOption}
        />
      </div>
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
        title={
          selectedOption === "single"
            ? "Create new product"
            : "Create new products"
        }
        style={{ top: 20 }}
        open={openModal}
        footer={null}
        centered
        className="!w-[50vw]"
        closable
        onCancel={() => setOpenModal(false)}
      >
        {selectedOption === "single" ? (
          <CreateProduct
            setOpenModal={setOpenModal}
            correctProductObject={selectedProduct}
          />
        ) : (
          <CreateBulkProducts />
        )}
      </Modal>

      <Modal
        title={selectedProduct?.name}
        style={{ top: 20 }}
        open={showViewProductModal}
        footer={null}
        centered
        className="!w-[50vw]"
        closable
        onCancel={handleClose}
      >
        <ViewProductDetails
          id={selectedProduct?._id as string}
          handleModifyProduct={handleModifyProduct}
        />
      </Modal>
    </div>
  );
}
