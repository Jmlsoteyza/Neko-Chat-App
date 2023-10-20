import { FirebaseDb } from "@/app/utils/FirebaseDb-chatApp";
import ChatRoom from "./ChatRoom";

export default function Chat() {
  const { handleSubmit, setNewMessage, newMessage, messages } = FirebaseDb();

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
