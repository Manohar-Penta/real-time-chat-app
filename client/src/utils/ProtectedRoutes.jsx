import { Outlet, useLoaderData, useNavigate } from "react-router";
import { useUserStore } from "../store/useUserStore";
import axios from "axios";
import { useEffect } from "react";

export async function loader() {
  let res = await axios.get(
    "https://realtimepager.onrender.com/api/auth/home",
    {
      withCredentials: true,
    }
  );
  return res.data;
}

export default function ProtectedRoutes() {
  const authenticate = useUserStore((state) => state.authenticate);
  const authenticated = useUserStore((state) => state.authenticated);
  const logOut = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  let data = useLoaderData();

  useEffect(() => {
    if (data && data.user) authenticate(data);
    else logOut();
    if (!authenticated) navigate("/login");
  }, [authenticated]);

  return (
    <div className="w-full flex justify-center">
      <Outlet />
    </div>
  );
}
