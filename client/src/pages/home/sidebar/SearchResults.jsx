export default function SearchResults({ users, onpress, setSearch }) {
  return (
    <div className="flex flex-col border rounded gap-2 p-1 absolute w-full backdrop-blur-3xl max-h-[30vh] overflow-auto">
      {users.map((user) => (
        <button
          key={user._id}
          className="flex content-start gap-4 items-center h-14 border rounded p-1 bg-blue-600"
          onClick={() => {
            onpress(user);
            setSearch("");
          }}
          type="button"
        >
          <SearchElement key={user._id} user={user} />
        </button>
      ))}
    </div>
  );
}

function SearchElement({ user }) {
  return (
    <>
      <img src={user.profilePic} alt="" className="size-12" />
      <h2 className="grow text-2xl font-semibold text-white text-start">
        {user.username}
      </h2>
    </>
  );
}
