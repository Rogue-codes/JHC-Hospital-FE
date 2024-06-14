import { Icons } from "../icons";

interface IButton {
  label: string;
  onClick?: () => void;
}
export default function PrimaryButton({ label, onClick }: IButton) {
  return (
    <button
      className="h-8 px-4 min-w-44 text-white hover:scale-105 transition-all bg-JHC-Primary rounded-lg flex justify-start items-center gap-5"
      onClick={onClick}
    >
      <Icons.add />
      {label}
    </button>
  );
}
