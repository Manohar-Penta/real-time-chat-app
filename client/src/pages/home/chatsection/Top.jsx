import { MdGroups3 } from "react-icons/md";

export default function Top({ username, pic }) {
  return (
    <>
      <div className="flex items-center gap-4 p-2 border-b">
        {pic !== "" ? (
          <img src={pic} alt="" className="size-12 rounded-full" />
        ) : (
          <MdGroups3 size={"3rem"} />
        )}
        <div className="flex flex-col grow overflow-hidden">
          <p className="text-3xl text-white font-semibold">{username}</p>
        </div>
        {/* <button className="bg-red-400 px-2 mx-2 rounded-md text-white text-lg hover:bg-red-600 transition-colors duration-300 hover:shadow-sm hover:shadow-[#f0f0f0] active:px-[0.4rem]">
          Block
        </button> */}
      </div>
    </>
  );
}
