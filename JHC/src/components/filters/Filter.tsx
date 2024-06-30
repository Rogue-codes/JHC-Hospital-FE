import DateSelect from "./DatePicker";
import { Icons } from "../icons";
import { Select } from "antd";
import { useGetManufacturersQuery } from "../../api/products.api";

interface IFilter {
  showDropdown?: boolean;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  noDate?: boolean;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  setStock?: React.Dispatch<React.SetStateAction<string>>;
  setManufacturer?: React.Dispatch<React.SetStateAction<string>>;
}
export default function Filter({
  showDropdown,
  search,
  setSearch,
  noDate,
  setCategory,
  setStock,
  setManufacturer,
}: IFilter) {
  const handleCategoryChange = (value: string) => {
    setCategory && setCategory(value);
    console.log("Selected Category:", value); // You can handle further actions here
  };

  const handleStockChange = (value: string) => {
    setStock && setStock(value);
    console.log("Selected Category:", value); // You can handle further actions here
  };

  const handleManufacturerChange = (value: string) => {
    setManufacturer && setManufacturer(value);
    console.log("Selected Category:", value); // You can handle further actions here
  };

  const { data } = useGetManufacturersQuery({});

  const manufacturerOptions = data?.data.map((manufacturer) => ({
    value: manufacturer,
    label: manufacturer,
  }));

  return (
    <div className="w-full mt-5 flex items-center gap-12">
      <div className="w-[18vw] relative rounded-3xl border bg-[#EBF5FF]">
        <input
          className="px-5 pl-8 h-8 w-full focus:outline-none rounded-3xl bg-transparent"
          type="text"
          name=""
          id=""
          placeholder="search"
          value={search}
          onChange={(e) => setSearch && setSearch(e.target.value)}
        />
        <Icons.search className="absolute left-3 top-[10px]" />
      </div>

      {showDropdown && (
        <Select
          placeholder="Product type"
          style={{ width: 180 }}
          allowClear
          options={[
            { value: "", label: "All" },
            { value: "Inhaler", label: "Inhaler" },
            { value: "Tablet", label: "Tablet" },
            { value: "Syrup", label: "Syrup" },
            { value: "Cream", label: "Cream" },
            { value: "Capsule", label: "Capsule" },
            { value: "Soap", label: "Soap" },
          ]}
          defaultValue={""}
          variant="borderless"
          className="border-JHC-Primary border rounded-2xl"
          onChange={handleCategoryChange}
        />
      )}

      {showDropdown && (
        <Select
          defaultValue="in-stock"
          style={{ width: 180 }}
          allowClear
          options={[
            { value: "in stock", label: "In Stock" },
            { value: "out of stock", label: "Out of stock" },
          ]}
          variant="borderless"
          className="border-JHC-Primary border rounded-2xl"
          onChange={handleStockChange}
        />
      )}

      {noDate && <DateSelect />}

      {showDropdown && (
        <Select
          placeholder="Manufacturer"
          style={{ width: 180 }}
          allowClear
          options={manufacturerOptions}
          variant="borderless"
          className="border-JHC-Primary border rounded-2xl"
          onChange={handleManufacturerChange}
        />
      )}
    </div>
  );
}
