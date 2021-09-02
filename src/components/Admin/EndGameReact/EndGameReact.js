import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../redux/actions/gameActions";
import styles from "./EndGameReact.css";
import { ShowMovs } from "../InGameReact/ShowMovs/ShowMovs";
import { API } from "../../..";
const axios = require("axios");

export function EndGameReact() {
  const [msg, setMsg] = useState("Connecting");
  const name = useSelector((state) => state.chess.name);
  const turn = useSelector((state) => state.chess.turn);
  const color = useSelector((state) => state.chess.playerColor);
  const dif = useSelector((state) => state.chess.dif);
  const movs = useSelector((state) => state.chess.moves);
  const wait = useSelector((state) => state.chess.wait);
  const status = useSelector((state) => state.chess.status);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setStatus("pause"));
  };

  useEffect(() => {
    if (!wait) loadData();
  }, [wait]);

  const loadData = () => {
    let payload = {
      playerName: name,
      playerColor: color,
      date: new Date().toLocaleString("en-US"),
      dif: dif,
      win: turn === "white" ? "black" : "white",
      movs: movs,
    };
    if (payload.movs.length < 10) {
      setMsg("Game too short");
    } else {
      if (status !== "saved") {
        axios.post(`${API}/game`, payload).then(() => {
          setMsg("Game saved");
          dispatch(setStatus("saved"));
        });
      } else {
        setMsg("Game saved");
      }
    }
  };

  return (
    <div className="ER">
      <div className="endgameTitle" >
        <h3> {`${turn === "white" ? "Black" : "White"} wins`}</h3>
        <p> {msg} </p>
      </div>
      <div className="inGameMovs">
        <ShowMovs />
      </div>
      <button className="mainButton" onClick={handleClick}>
        Rematch
      </button>
    </div>
  );
}
