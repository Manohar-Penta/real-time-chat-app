import { useEffect, useState } from "react";
import { useConversation } from "../../../store/useConversation";
import Bottom from "./Bottom";
import Convo from "./Convo";
import Top from "./Top";
import axios from "axios";
import { useUserStore } from "../../../store/useUserStore";

export default function ChatSection({ refresh, setRefresh }) {
  const idSelected = useConversation((state) => state.idSelected);
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const [pic, setPic] = useState("");
  const UserId = useUserStore((state) => state.user_id);

  function getChat() {
    axios
      .get(`http://localhost:5000/api/message/get/${idSelected}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        if (res.data.groupChat) {
          setUsername(res.data.chat);
          setPic("");
        } else {
          let users = res.data.users;
          let otheruser = users.find((user) => user._id !== UserId);
          setUsername(otheruser.username);
          setPic(otheruser.profilePic);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (idSelected) getChat();
    else setData({});
    setRefresh((state) => !state);
  }, [idSelected]);

  return (
    <>
      <div className="border m-2 flex flex-col bg-white bg-opacity-15 w-2/3">
        {idSelected && data._id && (
          <>
            <Top username={username} pic={pic} />
            <Convo refresh={refresh} />
            <Bottom update={setRefresh} />
          </>
        )}
      </div>
    </>
  );
}
