import React, { useState } from "react";
import styles from "./SearchBar.css";
import { setGameList } from "../../../redux/actions/gameActions";
import { useDispatch } from "react-redux";
import { API } from "../../..";
const axios = require("axios");

export function SearchBar({ buttonName, query, path }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleInputChange = function (e) {
    setSearch(e.target.value);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const gameSearch = () => {
    const aux = query
      ? `?${query}=${capitalizeFirstLetter(search)}`
      : `/${capitalizeFirstLetter(search)}`;
    axios({
      method: "get",
      url: `${API}/${path}${aux}`,
    }).then(function (response) {
      if (typeof response.data === "string") dispatch(setGameList([]));
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
