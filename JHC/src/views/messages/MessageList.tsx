import { Icons } from "../../components/icons";
import { IPatient } from "../../interfaces/patientfee.interface";
import { useSocketContext } from "../../context/SocketContext";

interface IMessageList {
  conversationList: IPatient[];
  selectedConversation: IPatient | null;
  setSelectedConversation: React.Dispatch<React.SetStateAction<IPatient | null>>;
}
export default function MessageList({
  conversationList,
  selectedConversation,
  setSelectedConversation,
}: IMessageList) {

  const {onlineUsers} = useSocketContext()

  console.log("onlineUsers", onlineUsers);

  return (
    <div className="w-[28vw] h-[90%] bg-white">
      {/* search */}
      <div className="w-full p-6 border-b border-[#D9D9D9]">
        <div className="w-[23vw] h-9 mx-auto relative rounded-3xl border bg-[#EBF5FF]">
          <input
            className="px-5 pl-8 h-full w-full focus:outline-none rounded-3xl bg-transparent"
            type="text"
            name=""
            id=""
            placeholder="search"
          />
          <Icons.search className="absolute left-3 top-[10px]" />
        </div>
      </div>

      {/* list */}
      <div className="overflow-y-scroll pl-8">
        {conversationList?.map((conversation) => (
          <div
            className={`${
              selectedConversation?._id === conversation._id
                ? "bg-JHC-Primary text-white"
                : ""
            } border-b border-[D9D9D9] cursor-pointer px-5 py-2 flex items-start justify-between`}
            key={conversation._id}
            onClick={() => setSelectedConversation(conversation)}
          >
            <div className="flex justify-start items-start gap-2">
              <div className="w-10 flex justify-center items-center h-10 rounded-full">
                <img
                  src={conversation.img_url}
                  className="rounded-full w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div>
                <h2 className="text-sm">
                  {conversation.first_name} {conversation.last_name}
                </h2>
                <p
                  className={`${
                    selectedConversation?._id === conversation._id
                      ? "text-white"
                      : "text-[#969696]"
                  } text-xs mt-1`}
                >
                  sent message
                </p>
              </div>
            </div>

            <p
              className={`${
                selectedConversation?._id === conversation._id
                  ? "text-white"
                  : "text-[#969696]"
              }  text-xs`}
            >
              9:00am
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
