import { chatbg, pic } from "../../assets";
import ChatArea from "./ChatArea";
import { Icons } from "../../components/icons";
import { messagesListArr } from "../../constants/constants";

export default function Message() {
  const chatHeader = () => {
    return (
      <div className="bg-JHC-Primary w-full h-[53px] rounded-tr-xl rounded-tl-xl flex justify-between items-center px-4">
        <div className="flex justify-start gap-4">
          <div className="w-10 flex justify-center items-center h-10 rounded-full">
            <img src={pic} alt="" />
          </div>
          <div>
            <p className="text-sm text-white">Elizabeth Polson</p>
            <p className="text-xs text-white">Online</p>
          </div>
        </div>

        <Icons.elipses className="cursor-pointer" />
      </div>
    );
  };

  return (
    <div className="w-[50vw] bg-white h-[90%] relative">
      {chatHeader()}
      <div className="w-full h-full relative">
        {/* background */}
        <div className="absolute left-0 top-0 h-full w-full z-0">
          <img src={chatbg} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="pt-5 w-full px-5 h-[calc(100%-53px)] overflow-y-scroll relative z-10">
          {messagesListArr.map((message, index) => (
            <div
              key={index} // Add a unique key to each mapped element
              className={`${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } mb-2 flex items-center w-full`}
            >
              <div className="w-[25vw]">
                <div
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-200 text-black"
                      : "bg-JHC-Primary text-white"
                  } rounded-2xl w-full py-4 px-3 h-full`}
                >
                  <p>{message.msg}</p>
                </div>
                <p className="text-xs pl-2 mt-2 text-gray-700">
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <ChatArea />
      </div>
    </div>
  );
}
