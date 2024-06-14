interface IActivaityCards {
  label: string;
  value: number;
  position: number;
  icon: JSX.Element;
}
export default function ActivityCards({
  position,
  icon,
  label,
  value,
}: IActivaityCards) {
  return (
    <div
      className={`${
        position === 1
          ? "bg-[#A4D2FF]"
          : position === 2
          ? "bg-[#A4FFBD]"
          : position === 3
          ? "bg-[#FFF598]"
          : position === 4
          ? "bg-[#CCA4FF]"
          : ""
      } w-[48%] h-28 my-2 border flex flex-col justify-center items-center gap-1 rounded-lg`}
    >
      <div>{icon}</div>
      <p className="text-JHC/Darkest font-semibold text-sm">{value}</p>
      <p className="text-JHC/Darkest font-medium text-sm">{label}</p>
    </div>
  );
}
