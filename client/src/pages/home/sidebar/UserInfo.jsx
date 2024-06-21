// import { RxAvatar } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { useLogout } from "../../../Hooks/useLogout";
import { IoMdAddCircleOutline } from "react-icons/io";
import Group from "./Group";
import { useUserStore } from "../../../store/useUserStore";

export default function UserInfo({ setRefresh }) {
  const logout = useLogout();
  const username = useUserStore((state) => state.username);
  const pic = useUserStore((state) => state.profilePic);

  return (
    <>
      <div className="flex p-2 justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          {/* <RxAvatar size="2rem"  /> */}
          <img src={pic} alt="" className="size-8 rounded-bl-full" />
          <h2 className="text-xl font-bold text-white">{username}</h2>
          <button
            className="bg-purple-800 rounded-lg p-[0.5rem] hover:bg-purple-900 active:p-[0.4rem] transition-all"
            type="button"
            onClick={logout}
          >
            <IoIosLogOut size={"1.5rem"} color="white" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 rounded-lg p-[0.5rem] hover:bg-blue-900 active:p-[0.4rem] transition-all"
            type="button"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <IoMdAddCircleOutline size={"1.5rem"} color="white" />
          </button>
          <Group setRefresh={setRefresh} />
        </div>
      </div>
    </>
  );
}
