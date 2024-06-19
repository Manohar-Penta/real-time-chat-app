import axios from "axios";
import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useUserStore } from "../../../store/useUserStore";
import { socket } from "../../../utils/socketIO.mjs";
import { useConversation } from "../../../store/useConversation";

export default function Conversations({ refresh }) {
  const [dataset, setDataset] = useState([]);
  const userId = useUserStore((state) => state.user_id);
  const authenticated = useUserStore((state) => state.authenticated);
  const idSelected = useConversation((state) => state.idSelected);
  const setId = useConversation((state) => state.setIdSelected);

  function fetchChats() {
    axios
      .get("https://realtimepager.onrender.com/api/message/chats", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data && res.data.results) setDataset(res.data.results);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (authenticated) fetchChats();
  }, [refresh, idSelected]);

  return (
    <div className="py-2 flex flex-col gap-2">
      {dataset.map((data) => {
        if (data.groupChat) {
          return (
            <button
              key={data._id}
              onClick={() => {
                setId(data._id);
                socket.emit("join chat", data._id);
              }}
            >
              <Conversation
                key={data._id}
                name={data.chat}
                lastMessage={
                  data.latestMessage
                    ? (data.latestMessage.sender._id == userId
                        ? "You : "
                        : `${data.latestMessage.sender.username} : `) +
                      data.latestMessage.message
                    : ""
                }
              />
            </button>
          );
        } else {
          let otherUser = data.users.find((user) => user._id !== userId);
          return (
            <button
              key={data._id}
              onClick={() => {
                setId(data._id);
                socket.emit("join chat", data._id);
              }}
            >
              <Conversation
                key={data._id}
                name={otherUser.username}
                lastMessage={
                  data.latestMessage
                    ? (data.latestMessage.sender._id == userId
                        ? "You : "
                        : "") + data.latestMessage.message
                    : ""
                }
              />
            </button>
          );
        }
      })}
    </div>
  );
}

function Conversation({ name, lastMessage }) {
  return (
    <>
      <div className="flex border rounded items-center gap-2 p-2">
        <div className="flex-grow-0 avatar z-0">
          <RxAvatar size="2.5rem" />
        </div>
        <div className="flex flex-col grow-[2] overflow-hidden">
          <p className="text-white text-lg">{name}</p>
          <span className="text-nowrap text-sm">{lastMessage}</span>
        </div>
      </div>
    </>
  );
}
