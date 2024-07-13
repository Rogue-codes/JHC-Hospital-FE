import { Icons } from "../../components/icons";

interface IChat {
  handleSendMessage: () => void;
  message_: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}
export default function ChatArea({
  handleSendMessage,
  message_,
  setMessage,
}: IChat) {
  return (
    <div className="w-full flex h-14 border-t-2 bg-white z-40 border-gray-300 absolute left-0 bottom-0">
      <textarea
        className="w-full pl-12 pt-3 h-full bg-transparent focus:outline-none"
        // type="text"
        value={message_}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        name=""
        id=""
      ></textarea>
      <Icons.emoji className="absolute left-4 top-4" />
      <div className="flex px-5 justify-start items-center gap-5">
        <Icons.attachment className="cursor-pointer" />
        <Icons.send
          className="cursor-pointer"
          onClick={() => handleSendMessage()}
        />
      </div>
    </div>
  );
}
