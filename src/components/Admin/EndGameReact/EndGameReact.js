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
  const dif = useSelector((state) => state.chess.dif);
  const movs = useSelector((state) => state.chess.moves);
  const wait = useSelector((state) => state.chess.wait);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setStatus("pause"));
  };

  useEffect(() => {
    if(!wait)loadData();
  }, [wait]);

  const loadData = () => {
    let payload = {
      playerName: name,
      playerColor: color,
      date: (new Date()).toLocaleString("en-US"),
      dif: dif,
      win: turn === 'white'? 'black' : 'white',
      movs: movs,
    };
    axios.post("http://localhost:3001/game", payload).then(
      ()=>{
        setMsg("Partida incluida en la base de datos")
    }
    );
  };

  return (
    <div className="ER">
    <div style = {{height:"30%"}}>
      <p style = {{marginTop:"40px"}}> {`${turn === "white" ? "Black" : "White"} wins`}</p>
      <p> {msg} </p>
      </div>
      <div style = {{height:"60%"}}>
      <ShowMovs />
      </div>
      <button className="mainButton" onClick={handleClick}>Rematch</button>
    </div>
  );
}
