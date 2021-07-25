import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setColor, setStatus } from "../../../redux/actions/gameActions";
import styles from "./InGameReact.css";
import { ShowMovs } from "./ShowMovs/ShowMovs";

export function InGameReact() {
  const dispatch = useDispatch();
  const [whiteActive, changeWhite] = useState(true);
  const playerName = useSelector((state) => state.chess.name);

  return (
    <div className="OR">
        <p>{`${playerName} vs Computer`}</p>
        <p> Server ID: 0</p>
        <ShowMovs needReset = {true}/>
        <button>
          Rendirse
        </button>
    </div>
  );
}
