import { Pie } from "@ant-design/plots";
import { Icons } from "../../components/icons";

export default function Chart() {
  const config = {
    data: [
      { type: "Paracetamol", value: 27 },
      { type: "Vitamin Tablets", value: 25 },
      { type: "Antacid Tablets", value: 18 },
      { type: "Others", value: 15 },
    ],
    angleField: "value",
    colorField: "type",
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: true,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return (
    <div className="w-[23vw] h-full bg-white">
      <div className="w-full px-4 py-2 flex justify-between items-center">
        <p className="text-sm">Top Medicines Sold</p>
        <div className="flex justify-center gap-3 items-center">
          <p className="text-xs">Weekly</p>
          <Icons.dropdown />
        </div>

        <Icons.expand />
      </div>
      <Pie {...config} />;
    </div>
  );
}
