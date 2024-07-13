import { useEffect, useState } from "react";
import {
  messageApi,
  useGetCoversationsQuery,
  useGetMessageQuery,
  useSendMessageMutation,
} from "../../api/message.api";
import Message from "./Message";
import MessageList from "./MessageList";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { IPatient } from "../../interfaces/patientfee.interface";
import { toast } from "react-toastify";
import notificationSound from "../../assets/sound/frontend_src_assets_sounds_notification.mp3";
import { useSocketContext } from "../../context/SocketContext";
import { useDispatch } from "react-redux";

export default function Messages() {
  const { data: conversations, isLoading } = useGetCoversationsQuery({});
  const [selectedConversation, setSelectedConversation] =
    useState<IPatient | null>(null);

  const [message_, setMessage] = useState("");

  useEffect(() => {
    setSelectedConversation(conversations?.data[0]);
  }, [conversations]);

  const {
    data: message,
    isLoading: messageLoading
  } = useGetMessageQuery(
    {
      id: selectedConversation?._id as string,
    },
    {
      skip: !selectedConversation,
    }
  );

  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = () => {
    sendMessage({ message: message_, id: selectedConversation?._id as string })
      .unwrap()
      .then(() => setMessage(""))
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message);
      });
  };

  console.log("message");
  console.log("selected", selectedConversation);

  const { socket } = useSocketContext();

  const dispatch = useDispatch();
  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      dispatch(messageApi.util.invalidateTags(["Messages"]));
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]);

  return (
    <div className="w-full h-screen -mt-28 flex justify-between items-start">
      {isLoading || messageLoading ? (
        <div className="w-full h-44 flex justify-center items-center">
          <Spin
            indicator={<LoadingOutlined spin style={{ color: "white" }} />}
          />
        </div>
      ) : (
        <>
          <MessageList
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            conversationList={conversations?.data}
          />
          <Message
            messages={message?.data}
            selectedConversation={selectedConversation}
            handleSendMessage={handleSendMessage}
            message_={message_}
            setMessage={setMessage}
          />
        </>
      )}
    </div>
  );
}
