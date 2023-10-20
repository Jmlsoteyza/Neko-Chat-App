import { firebaseDb } from "@/app/utils/firebaseDb-chatApp";
import ChatRoom from "./ChatRoom";

export default function Chat() {
  const { handleSubmit, setNewMessage, newMessage, messages } = firebaseDb();

  return (
    <div>
      <ChatRoom
        handleSubmit={handleSubmit}
        setNewMessage={setNewMessage}
        newMessage={newMessage}
        messages={messages}
      />
    </div>
  );
}
