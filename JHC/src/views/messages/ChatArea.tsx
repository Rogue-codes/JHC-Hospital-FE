import { Icons } from "../../components/icons";

export default function ChatArea() {
  return (
    <div className="w-full flex h-14 border-t-2 bg-white z-40 border-gray-300 absolute left-0 bottom-0">
      <input
        className="w-full pl-12 h-full bg-transparent focus:outline-none"
        type="text"
        placeholder="Type a message"
        name=""
        id=""
      />
      <Icons.emoji className="absolute left-4 top-4" />
      <div className="flex px-5 justify-start items-center gap-5">
        <Icons.attachment className="cursor-pointer" />
        <Icons.send className="cursor-pointer" />
      </div>
    </div>
  );
}
