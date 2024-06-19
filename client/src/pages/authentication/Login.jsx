// import { Form } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Form, useActionData, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from "../../store/useUserStore";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    let res = await axios.post(
      "https://realtimepager.onrender.com/api/auth/login",
      { ...updates },
      {
        withCredentials: true,
      }
    );
    // console.log(res.data);
    res.data.status
      ? toast.success("Authenticated...")
      : toast.error(res.data.err);
    let data = res.data;
    return data;
  } catch (err) {
    toast.error(err);
    return err;
  }
}

export default function Login() {
  const [passVis, setPassVis] = useState(false);
  const authenticate = useUserStore((state) => state.authenticate);
  const status = useUserStore((state) => state.authenticated);
  let data = useActionData();

  useEffect(() => {
    if (data && data.status) authenticate(data);
  }, [data]);

  if (status) {
    return <Navigate to="/" />;
  } else
    return (
      <>
        <div>
          <Toaster position="top-center" />
        </div>
        <div className="flex flex-col gap-4 bg-white bg-opacity-5 border border-white/30 p-8 backdrop-blur-sm">
          <h2 className="text-4xl font-extrabold dark:text-white">
            Login with your Credentials
          </h2>
          <Form className="flex flex-col gap-2" method="post">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                maxLength="15"
                autoFocus
                autoComplete="off"
                required
              />
            </label>
            <br />
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={passVis ? "text" : "password"}
                className="grow"
                name="password"
                placeholder="password"
                maxLength="15"
                required
              />
              <button
                className="h-4 w-4"
                onClick={() => {
                  setPassVis(!passVis);
                }}
                type="button"
              >
                <img src={passVis ? "/eye-hide.svg" : "/eye-show.svg"} />
              </button>
            </label>
            <button type="submit" className="btn btn-outline m-2">
              Login
            </button>
          </Form>
          <Link to="/signup" className="hover:underline text-center">
            {"Don't have a account? SignUp Here..."}
          </Link>
        </div>
      </>
    );
}
