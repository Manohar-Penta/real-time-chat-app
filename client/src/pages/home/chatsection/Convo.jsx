import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../store/useUserStore";
import Message from "./Message";
import axios from "axios";
import { useConversation } from "../../../store/useConversation";

export default function Convo({ refresh }) {
  const [messages, setMessages] = useState([]);
  const userId = useUserStore((state) => state.user_id);
  const idSelected = useConversation((state) => state.idSelected);

  const convoRef = useRef();

  function getChat() {
    axios
      .get(`https://realtimepager.onrender.com/api/message/get/${idSelected}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMessages(res.data.messages);
        // console.log("convo: ", res.data);
      })
      .catch((err) => console.log(err));
  }

  const updateChat = () => {
    if (idSelected) getChat();
    else setMessages([]);
  };

  useEffect(() => {
    updateChat();
  }, [refresh, idSelected]);

  useEffect(() => {
    convoRef.current.scrollIntoView({ behavior: "instant" });
  });

  return (
    <>
      <div className="grow overflow-auto flex flex-col">
        {messages.map((message) => {
          return (
            <Message
              key={message._id}
              text={message.message}
              myMsg={message.sender._id == userId}
              time={message.updatedAt}
              sender={message.sender.username}
              refresh={refresh}
            />
          );
        })}
        <div ref={convoRef}></div>
      </div>
    </>
  );
}
