import React, { useState } from "react";
import styles from "./SearchBar.css";
import { setGameList } from "../../../redux/actions/gameActions";
import { useDispatch } from "react-redux";
const axios = require("axios");

export function SearchBar({buttonName,query,path}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleInputChange = function (e) {
    setSearch(e.target.value);
  };
  const gameSearch = () => {
    const aux = query? `?${query}=${search}`: `/${search}`
    axios({
      method: "get",
      url: `http://localhost:3001/${path}${aux}`,
    }).then(function (response) {
      if (typeof response.data === 'string') dispatch(setGameList([]));
      else dispatch(setGameList(response.data));
    });
  };
  return (
    <div className="searchBar">
      <input
        className="searchInput"
        type="text"
        name="username"
        value={search}
        onChange={handleInputChange}
      />
      <button className="genericButton" onClick={gameSearch}>
        {buttonName}
      </button>
    </div>
  );
}
