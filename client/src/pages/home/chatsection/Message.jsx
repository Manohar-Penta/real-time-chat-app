export default function Message({ text, myMsg, time, sender }) {
  let createTime = new Date(time);
  let dispTime = ('0'+createTime.getHours()).slice(-2)+ ":" + ('0'+createTime.getMinutes()).slice(-2);

  return (
    <>
      <div
        className={
          "w-[70%] m-2 p-2 rounded-md text-gray-200 " +
          (myMsg ? "self-end bg-blue-500" : "self-start bg-slate-500")
        }
      >
        {!myMsg && <p className="text-sm text-slate-300">{sender}</p>}
        <p className="text-xl">{text}</p>
        <p className="text-xs text-end">{dispTime}</p>
      </div>
    </>
  );
}
