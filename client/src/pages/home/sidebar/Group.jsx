import { useState } from "react";
import Search from "./Search";
import { ImCancelCircle } from "react-icons/im";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useConversation } from "../../../store/useConversation";
import { socket } from "../../../utils/socketIO.mjs";
import { useUserStore } from "../../../store/useUserStore";

export default function Group({ setRefresh }) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const setId = useConversation((state) => state.setIdSelected);
  const currUser = useUserStore((state) => state.user_id);

  function onpress(user) {
    setMembers((members) => {
      let newMembers = members.find((member) => member._id === user._id);
      if (!newMembers) return [...members, user];
      else {
        toast.error("User is already added...");
        return members;
      }
    });
  }

  function removeMember(id) {
    setMembers((members) => {
      return members.filter((member) => member._id !== id);
    });
  }

  return (
    <>
      <Toaster />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box overflow-visible">
          <h3 className="font-bold text-lg">New Group Chat</h3>
          <br />
          <form
            className="flex flex-col justify-center gap-2 items-center"
            method="dialog"
            onSubmit={(e) => {
              e.preventDefault();
              if (members.length < 2) {
                toast.error("Select atleast 2 Members...");
                return;
              }
              axios
                .post(
                  "https://realtimepager.onrender.com/api/message/group/create",
                  {
                    name: groupName,
                    users: members,
                  },
                  { withCredentials: true }
                )
                .then((res) => {
                  setGroupName("");
                  setId(res.data._id);
                  setMembers([]);
                  document.getElementById("my_modal_1").close();
                  setRefresh((state) => !state);
                  // console.log("working till here");
                  socket.emit("new message", {
                    sender: currUser,
                    chat: res.data,
                  });
                });
            }}
          >
            <input
              type="text"
              placeholder="Group Name..."
              className="input input-bordered w-full"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
            <div className="flex gap-1 flex-wrap justify-center">
              {members.map((member) => {
                return (
                  <div
                    key={member._id}
                    className="flex gap-2 border rounded items-center p-1 text-base font-semibold"
                  >
                    <span>{member.username}</span>
                    <ImCancelCircle
                      size="1rem"
                      onClick={() => removeMember(member._id)}
                    />
                  </div>
                );
              })}
            </div>
            <button className="btn btn-outline" type="submit">
              Create
            </button>
          </form>
          <br />
          <Search onpress={onpress} />
        </div>
      </dialog>
    </>
  );
}
