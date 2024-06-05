import axios from "axios";
import toast from "react-hot-toast";
import { useUserStore } from "../store/useUserStore";
import { useConversation } from "../store/useConversation";

export function useLogout() {
  const logoutState = useUserStore((state) => state.logout);
  const setIdSelected = useConversation((state) => state.setIdSelected);
  async function logout() {
    try {
      axios
        .post(
          "http://localhost:5000/api/auth/logout",
          {},
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data && res.data.status) {
            logoutState();
            setIdSelected("");
          }
        });
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }
  return logout;
}
