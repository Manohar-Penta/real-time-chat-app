import { AiFillPicture } from "react-icons/ai";
import { FaCamera, FaMicrophone } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useConversation } from "../../../store/useConversation";
import axios from "axios";
import { useUserStore } from "../../../store/useUserStore";
import { socket } from "../../../utils/socketIO.mjs";

export default function Bottom({ update }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const idSelected = useConversation((state) => state.idSelected);
  const userId = useUserStore((state) => state.user_id);

  useEffect(() => {
    setText("");
  }, [idSelected]);

  function pushMessage() {
    if (text.trim() == "" && idSelected !== "") return;
    axios
      .put(
        `https://realtimepager.onrender.com/api/message/push/${idSelected}`,
        { text },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data);
        socket.emit("new message", {
          sender: userId,
          chat: res.data._doc,
        });
        setText("");
        setOpen(false);
        update((state) => !state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="flex gap-1 items-center mt-2 p-1">
        <div className="flex items-stretch gap-1">
          <AiFillPicture size="1.75rem" />
          <FaCamera size="1.5rem" />
          <FaMicrophone size="1.5rem" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            pushMessage();
          }}
          className="flex-grow"
        >
          <input
            type="text"
            name="text"
            id="foo"
            className="text-lg min-w-0 w-full grow rounded-lg p-1 focus:outline-none"
            placeholder="Type here..."
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
        </form>
        <div className="flex items-center gap-1">
          <div className="relative">
            <span className="absolute right-0 bottom-10">
              <EmojiPicker
                open={open}
                onEmojiClick={(event) => {
                  setText((text) => text + event.emoji);
                }}
              />
            </span>
            <MdEmojiEmotions size="1.6rem" onClick={() => setOpen(!open)} />
          </div>
          <IoSend size="1.8rem" onClick={() => pushMessage()} />
        </div>
      </div>
    </>
  );
}
