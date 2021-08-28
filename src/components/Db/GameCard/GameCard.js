import React from "react";
import styles from "./GameCard.css";
import { Link } from "react-router-dom";

//Images
import BkImg from "../../../img/pixel/blackKing.png";
import WkImg from "../../../img/pixel/whiteKing.png";

import bkg1 from "../../../assets/db/1.jpg";
import bkg2 from "../../../assets/db/2.jpg";
import bkg3 from "../../../assets/db/3.jpg";
import bkg4 from "../../../assets/db/4.jpg";
import bkg5 from "../../../assets/db/5.jpg";
import bkg6 from "../../../assets/db/6.jpg";
import bkg7 from "../../../assets/db/7.jpg";
import bkg8 from "../../../assets/db/8.jpg";
import bkg9 from "../../../assets/db/9.jpg";
import bkg10 from "../../../assets/db/10.jpg";

const imgDicc = {
  Kingblack: BkImg,
  Kingwhite: WkImg,
};

const bkgArr = [bkg1, bkg2, bkg3, bkg4, bkg5, bkg6, bkg7, bkg8, bkg9, bkg10];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function GameCard({ game, index }) {
  const date = game.date.slice(0, 19).replace("T", " ");
  return (
    <div className="gameCard">
      <div className="firstBoxCard">
        <img src={bkgArr[getRandomInt(0, 9)]} className="imgCard"></img>
      </div>
      <div className="secondBoxCard">
      {`${game.playerName} vs Computer`}
      </div>
    </div>
  );
}
