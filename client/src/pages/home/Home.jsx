import { useEffect, useState } from "react";
import ChatSection from "./chatsection/ChatSection";
import SideBar from "./sidebar/SideBar";
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from "../../store/useUserStore";
import { socket } from "../../utils/socketIO.mjs";
import { useConversation } from "../../store/useConversation";

export default function Home() {
  const user_id = useUserStore((state) => state.user_id);
  const selectedId = useConversation((state) => state.idSelected);
  const [refresh, setRefresh] = useState(true);

  // console.log(selectedId);

  const msgReceived = (message) => {
    // console.log(message);
    // console.log(message.chat._id, selectedId);
    if (message.chat._id !== selectedId) {
      if (message.chat.latestMessage) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              {message.chat.groupChat && <div>{message.chat.chat}</div>}
              <div className="text-xl">
                {`${message.chat.latestMessage.sender.username} :
        ${message.chat.latestMessage.message}`}
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
      } else toast(`${message.chat.chat} created`, { icon: "💌" });
    }
    setRefresh((state) => !state);
  };

  // useEffect(() => {
  //   console.log(selectedId);
  // }, [selectedId]);

  useEffect(() => {
    socket.emit("setup", user_id);
  }, []);

  useEffect(() => {
    socket.on("message received", msgReceived);

    return () => {
      // console.log("home dismounted...");
      socket.off("message received", msgReceived);
    };
  }, [selectedId]);

  return (
    <>
      <div className="flex h-[95vh] border backdrop-blur-sm min-w-[800px] w-[80%]">
        <Toaster />
        <SideBar refresh={refresh} setRefresh={setRefresh} />
        <ChatSection refresh={refresh} setRefresh={setRefresh} />
      </div>
    </>
  );
}
