import { Form } from "react-router-dom";
import SearchResults from "./SearchResults";
import { useSearch } from "../../../Hooks/useSearch";

export default function Search({ onpress }) {
  const { search, setSearch, searchResults } = useSearch();
  return (
    <>
      <div className="w-full relative gap-2 ">
        <Form role="search" className="flex mb-1">
          <input
            className="input input-bordered mx-1 flex-grow min-w-0"
            type="search"
            placeholder="Search..."
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            value={search}
          />
        </Form>
        <div className={`absolute w-full z-10 ${search ? "" : "hidden"}`}>
          {search !== "" && searchResults.length > 0 && (
            <SearchResults users={searchResults} onpress={onpress} setSearch={setSearch}/>
          )}
        </div>
      </div>
    </>
  );
}
