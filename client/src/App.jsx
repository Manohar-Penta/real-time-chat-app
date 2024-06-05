import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <div className="h-screen flex justify-center items-center w-screen border">
        <Outlet />
      </div>
    </>
  );
}
