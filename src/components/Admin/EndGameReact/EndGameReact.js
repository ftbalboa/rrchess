import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../redux/actions/gameActions";
import styles from "./EndGameReact.css";
import { ShowMovs } from "../InGameReact/ShowMovs/ShowMovs";

export function EndGameReact() {
  const turn = useSelector((state) => state.chess.turn);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setStatus("pause"));
  };

  return (
    <div className="OR">
      <p> {`${turn === "white" ? "Black" : "White"} wins`}</p>
      <p> Ty for the game</p>
      <p> Server ID: 0</p>
      <ShowMovs />
      <button onClick={handleClick}>Rematch</button>
    </div>
  );
}
