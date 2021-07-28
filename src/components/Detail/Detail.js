import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Detail.css";
const axios = require("axios");

export function Detail({ gameIndex }) {
  const gameList = useSelector((state) => state.chess.gameList);
  const [gameData, setGameData] = useState(gameList[gameIndex]);
  console.log("here");
  console.log(gameData);
  return (<div className="detailGame">{gameData.id}</div>);
}
