import Message from "./Message";
import MessageList from "./MessageList";

export default function Messages() {
  return (
    <div className="w-full h-screen flex justify-between items-start">
      <MessageList/>
      <Message/>
    </div>
  );
}
