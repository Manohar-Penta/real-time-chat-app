import { create } from "zustand";
import { produce } from "immer";

export const useUserStore = create((set) => ({
  authenticated: false,
  user_id: "",
  username: "",
  profilePic: "",
  authenticate: (data) => {
    set(
      produce((state) => {
        if (data.user) {
          state.authenticated = data.status;
          state.user_id = data.user._id;
          state.username = data.user.username;
          state.profilePic = data.user.profilePic;
        }
      })
    );
  },
  logout: () => {
    set(
      produce((state) => {
        state.authenticated = false;
        state.user_id = "";
        state.username = "";
        state.profilePic = "";
      })
    );
  },
}));
