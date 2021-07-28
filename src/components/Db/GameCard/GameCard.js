import React from "react";
import styles from "./GameCard.css";
import { Link } from "react-router-dom";

//Images
import BkImg from "../../../img/pixel/blackKing.png";
import WkImg from "../../../img/pixel/whiteKing.png";

const imgDicc = {
  Kingblack: BkImg,
  Kingwhite: WkImg,
};

export function GameCard({ game, index }) {
  console.log(game);
  const date = game.date.slice(0, 19).replace("T", " ");
  return (
    <div className="gameCard">
      <div className="cardTitle">
        ID:{game.id} {date}
      </div>
      <div className="cardContain">
        <div className="pic">
          {game.playerName}
          <img
            className="cardImg"
            src={
              game.playerColor === "white"
                ? imgDicc["Kingwhite"]
                : imgDicc["Kingblack"]
            }
          ></img>
        </div>
        vs
        <div className="pic">
          Computer
          <img
            className="cardImg"
            src={
              game.playerColor === "black"
                ? imgDicc["Kingwhite"]
                : imgDicc["Kingblack"]
            }
          ></img>
        </div>
      </div>
      <Link to={`/detail/${index}`} className="gameMinT">
        Ver juego
      </Link>
    </div>
  );
}
