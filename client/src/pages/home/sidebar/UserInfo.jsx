import { RxAvatar } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { useLogout } from "../../../Hooks/useLogout";
import { IoMdAddCircleOutline } from "react-icons/io";
import Group from "./Group";

export default function UserInfo({ setRefresh }) {
  const logout = useLogout();

  return (
    <>
      <div className="flex p-2 justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <RxAvatar size="2rem" />
          <h2 className="text-xl font-bold text-white">Username</h2>
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
