import axios from "axios";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useUserStore } from "../../store/useUserStore";
import { useEffect } from "react";

export async function action({ request }) {
  try {
    console.log("Register action");
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const res = await toast.promise(
      axios.post(
        "http://localhost:5000/api/auth/signup",
        { ...updates },
        {
          withCredentials: true,
        }
      ),
      {
        loading: "Making a Account for you...",
        success: "Account Created!!",
        error: "Account creation failed...",
      }
    );

    return res.data;
  } catch (err) {
    toast.error(err);
    return { err };
  }
}

export default function Register() {
  const authenticate = useUserStore((state) => state.authenticate);
  const status = useUserStore((state) => state.authenticated);
  const navigate = useNavigate();

  let data = useActionData();
  if (data && data.user) authenticate(data);

  useEffect(() => {
    if (status) navigate("/");
  }, [status]);

  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="flex flex-col gap-4 bg-white bg-opacity-10 p-8 backdrop-blur-sm border border-white/30">
        <h2 className="text-4xl font-extrabold dark:text-white">
          Sign Up to use QuickChat
        </h2>
        <Form method="post" className="flex flex-col gap-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              name="fullName"
              maxLength={"50"}
              autoComplete="off"
              autoFocus
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="User Name"
              name="username"
              maxLength={"30"}
              autoComplete="off"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              maxLength="15"
              autoComplete="off"
              onFocus={(event) => {
                event.target.type = "text";
              }}
              onBlur={(event) => {
                event.target.type = "password";
              }}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Confirm Password"
              name="confirmPassword"
              maxLength="15"
              autoComplete="off"
              onFocus={(event) => {
                event.target.type = "text";
              }}
              onBlur={(event) => {
                event.target.type = "password";
              }}
              required
            />
          </label>
          <select
            name="gender"
            id="gender"
            className="select select-bordered text-center"
            defaultValue=""
            required
          >
            <option className="hidden" value="">
              Select your gender
            </option>
            <option value="boy">Male</option>
            <option value="girl">Female</option>
          </select>
          <button type="submit" className="btn mt-8 btn-outline">
            Sign Up
          </button>
        </Form>
        <Link to="/login" className="hover:underline text-center">
          Have an account? Login in Here..
        </Link>
      </div>
    </>
  );
}
