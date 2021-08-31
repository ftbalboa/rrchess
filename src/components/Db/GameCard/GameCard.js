import React, { useState } from "react";
import styles from "./GameCard.css";
import { NavLink } from "react-router-dom";

export function GameCard({ game, img }) {
  const [load, setLoad] = useState(false);
  return (
    <NavLink to={`/detail/${game.id}`}>
    <div className="gameCard" style={load? {display:"flex"} : {display:"none"} }>
    
      <div className="firstBoxCard">
        <img src={img} style={load? {} : {display:"none"} } className="imgCard" onLoad={()=>setLoad(true)}></img>
      </div>
      <div className="secondBoxCard">
        <div className={"cardName"}>
          {game.playerColor === "white" ? game.playerName : "Computer"}
        </div>
        <div className={"vsDiv"}>vs</div>
        <div className={"cardName"}> {game.playerColor === "black" ? game.playerName : "Computer"}</div>
      </div>
      
    </div>
    </NavLink>
  );
}
