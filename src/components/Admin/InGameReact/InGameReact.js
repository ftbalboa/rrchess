import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { setStatus, setId } from "../../../redux/actions/gameActions";
import styles from "./InGameReact.css";
import { ShowMovs } from "./ShowMovs/ShowMovs";
import axios from "axios";

export function InGameReact() {
  const dispatch = useDispatch();
  const playerName = useSelector((state) => state.chess.name);

  return (
    <div className="IR">
      <div style = {{height:"30%"}}>
        <p style = {{marginTop:"40px", textShadow: "1px 1px 10px YellowGreen"}}>{`${playerName} vs Computer`}</p>
      </div>
      <div className="inGameMovs">
        <ShowMovs needReset={true} />
      </div>
      <button
        className={"mainButton"}
        onClick={() => {
          dispatch(setStatus("mated"));
        }}
      >
        Rendirse
      </button>
    </div>
  );
}
