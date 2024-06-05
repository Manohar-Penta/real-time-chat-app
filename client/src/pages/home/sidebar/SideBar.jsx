import Search from "./Search";
import Conversations from "./Conversations";
import UserInfo from "./UserInfo";
import axios from "axios";
import { useConversation } from "../../../store/useConversation";
import { socket } from "../../../utils/socketIO.mjs";

export default function SideBar({ refresh, setRefresh }) {
  const setId = useConversation((state) => state.setIdSelected);

  function onpress(user) {
    axios
      .get(`http://localhost:5000/api/message/${user._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setRefresh(!refresh);
        // console.log(res.data);
        setId(res.data._id);
        socket.emit("join chat", res.data._id);
      });
  }

  return (
    <>
      <div className="overflow-y-auto overflow-x-clip w-1/3 m-2 border p-2 bg-white bg-opacity-10">
        <UserInfo setRefresh={setRefresh} />
        <Search onpress={onpress} />
        {/* <Conversations setId={setId} refresh={refresh} /> */}
        <Conversations refresh={refresh} />
      </div>
    </>
  );
}
