import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../redux/actions/gameActions";
import styles from "./EndGameReact.css";
import { ShowMovs } from "../InGameReact/ShowMovs/ShowMovs";
const axios = require("axios");

export function EndGameReact() {
  const [msg, setMsg] = useState("");
  const name = useSelector((state) => state.chess.name);
  const turn = useSelector((state) => state.chess.turn);
  const color = useSelector((state) => state.chess.playerColor);
  const gameId = useSelector((state) => state.chess.id);
  const dif = useSelector((state) => state.chess.dif);
  const movs = useSelector((state) => state.chess.moves);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setStatus("pause"));
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let payload = {
      id: gameId,
      playerName: name,
      playerColor: color,
      date: (new Date()).toLocaleString("en-US"),
      dif: dif,
      win: turn,
      movs: movs,
    };
    axios.post("http://localhost:3001/game", payload).then(
      ()=>{
        setMsg("Partida incluida en la base de datos")
    }
    );
  };

  return (
    <div className="OR">
      <p> {`${turn === "white" ? "Black" : "White"} wins`}</p>
      <p> Ty for the game</p>
      <p>{`Game ID: ${gameId}`}</p>
      <p> {msg} </p>
      <ShowMovs />
      <button onClick={handleClick}>Rematch</button>
    </div>
  );
}
