import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const DateSelect: React.FC = () => (
  <Space direction="vertical">
    <DatePicker className="border-JHC-Primary border rounded-2xl" onChange={onChange} />
  </Space>
);

export default DateSelect;
