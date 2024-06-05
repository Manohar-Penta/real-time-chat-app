import { createContext, useContext } from "react";

const authContext = createContext();

export function useAuthContext() {
  return useContext(authContext);
}

export function authContextProvider({ children }) {
  return <authContext.Provider>{children}</authContext.Provider>;
}
