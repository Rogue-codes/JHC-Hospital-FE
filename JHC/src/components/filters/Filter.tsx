import DateSelect from "./DatePicker";
import { Icons } from "../icons";
import { Select } from "antd";

interface IFilter {
  showDropdown?: boolean;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  noDate?:boolean;
}
export default function Filter({ showDropdown, search, setSearch, noDate }: IFilter) {
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
            { value: "Inhaler", label: "Inhaler" },
            { value: "Tablet", label: "Tablet" },
            { value: "Syrup", label: "Syrup" },
            { value: "Cream", label: "Cream" },
            { value: "Capsule", label: "Capsule" },
            { value: "Soap", label: "Soap" },
          ]}
          variant="borderless"
          className="border-JHC-Primary border rounded-2xl"
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
        />
      )}

      {noDate && <DateSelect />}

      {showDropdown && (
        <Select
          placeholder="Manufacturer"
          style={{ width: 180 }}
          allowClear
          options={[
            { value: "John’s Health Care", label: "John’s Health Care" },
            { value: "Patrikson Pvt Ltd", label: "Patrikson Pvt Ltd" },
            { value: "David’s Ltd", label: "David’s Ltd" },
            { value: "Johnson & Johnson", label: "Johnson & Johnson" },
            { value: "Mickel’s Lab", label: "Mickel’s Lab" },
            { value: "David’s Ltd", label: "David’s Ltd" },
            { value: "Joe Industries", label: "Joe Industries" },
          ]}
          variant="borderless"
          className="border-JHC-Primary border rounded-2xl"
        />
      )}
    </div>
  );
}
