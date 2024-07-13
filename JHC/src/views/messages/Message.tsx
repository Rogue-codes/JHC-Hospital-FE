import { chatbg } from "../../assets";
import ChatArea from "./ChatArea";
import { Icons } from "../../components/icons";
import { IMessage } from "../../interfaces/message.interface";
import { useSelector } from "react-redux";
import { formattedTime } from "../../utils";
import { IPatient } from "../../interfaces/patientfee.interface";
import { useEffect, useRef } from "react";

interface IMessage_ {
  messages: IMessage[];
  selectedConversation: IPatient | null;
  handleSendMessage: () => void;
  message_: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}
export default function Message({
  messages,
  selectedConversation,
  handleSendMessage,
  message_,
  setMessage,
}: IMessage_) {
  const user = useSelector((state: any) => state.auth.user);

  const chatHeader = () => {
    return (
      <div className="bg-JHC-Primary w-full h-[53px] rounded-tr-xl rounded-tl-xl flex justify-between items-center px-4">
        <div className="flex justify-start gap-4">
          <div className="w-10 flex justify-center items-center h-10 rounded-full">
            <img
              src={selectedConversation?.img_url}
              className="rounded-full h-full w-full object-cover"
              alt=""
            />
          </div>
          <div>
            <p className="text-sm text-white">
              {selectedConversation?.first_name}{" "}
              {selectedConversation?.last_name}
            </p>
            <p className="text-xs text-white">Online</p>
          </div>
        </div>

        <Icons.elipses className="cursor-pointer" />
      </div>
    );
  };

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="w-[50vw] bg-white h-[90%] relative">
      {chatHeader()}
      <div className="w-full h-full relative">
        {/* background */}
        <div className="absolute left-0 top-0 h-full w-full z-0">
          <img src={chatbg} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="pt-5  w-full px-5 h-[calc(100%-53px)] overflow-y-scroll relative z-10">
          {messages?.map((message) => (
            <div
              key={message._id} // Add a unique key to each mapped element
              className={`${
                user._id !== message.senderId ? "justify-start" : "justify-end"
              } mb-2 flex items-center w-full`}
              ref={lastMessageRef}
            >
              <div className="w-[25vw]">
                <div
                  className={`${
                    user._id !== message.senderId
                      ? "bg-gray-200 text-black"
                      : "bg-JHC-Primary text-white"
                  } rounded-2xl w-full py-4 px-3 h-full`}
                >
                  <p>{message.message}</p>
                </div>
                <p className="text-xs pl-2 mt-2 text-gray-700">
                  {formattedTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <ChatArea
          handleSendMessage={handleSendMessage}
          message_={message_}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}
