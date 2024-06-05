import axios from "axios";
import { useEffect, useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function getUsers() {
    try {
      let value = search;
      return await axios.post(
        "http://localhost:5000/api/users",
        { search: value.trim() },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      return { status: false, err };
    }
  }

  useEffect(() => {
    if (search.trim() !== "")
      getUsers()
        .then((res) => {
          if (res.data.searchUsers) setSearchResults([...res.data.searchUsers]);
          else setSearchResults([]);
        })
        .catch((err) => console.log(err));
    else setSearchResults([]);
  }, [search]);

  return { search, setSearch, searchResults };
}
