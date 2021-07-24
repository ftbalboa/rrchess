import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPiece } from "../../redux/actions/gameActions";
import "./Piece.css";

//Images
import BpImg from "../../img/pixel/blackPawn.png";
import BrImg from "../../img/pixel/blackRook.png";
import BhImg from "../../img/pixel/blackHorse.png";
import BbImg from "../../img/pixel/blackBishop.png";
import BqImg from "../../img/pixel/blackQueen.png";
import BkImg from "../../img/pixel/blackKing.png";
import WpImg from "../../img/pixel/whitePawn.png";
import WrImg from "../../img/pixel/whiteRook.png";
import WhImg from "../../img/pixel/whiteHorse.png";
import WbImg from "../../img/pixel/whiteBishop.png";
import WqImg from "../../img/pixel/whiteQueen.png";
import WkImg from "../../img/pixel/whiteKing.png";
import SelImg from "../../img/select.png";
import ThrImg from "../../img/threat.png";

const imgDicc = {
  Pawnblack: BpImg,
  Rookblack: BrImg,
  Horseblack: BhImg,
  Bishopblack: BbImg,
  Queenblack: BqImg,
  Kingblack: BkImg,
  Pawnwhite: WpImg,
  Rookwhite: WrImg,
  Horsewhite: WhImg,
  Bishopwhite: WbImg,
  Queenwhite: WqImg,
  Kingwhite: WkImg,
  Select: SelImg,
  Threat: ThrImg,
};

export function PieceReact({ piece, clickSel, clickThr, posFun }) {
  const color = useSelector((state)=>state.chess.playerColor);
  const rBoard = [8,7,6,5,4,3,2,1];
  let style = {
    backgroundColor: "transparent",
    gridColumn: posFun(piece.pos,'column'),
    gridRow:  posFun(piece.pos,'row'),
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "all",
    cursor: "pointer",
  };
  if(!piece.alive) style = {display: 'none'}
  const img = imgDicc[`${piece.name}${piece.color}`];
  const handleClickSel = () => {
    clickSel(piece);
  };
  const handleClickThr = () => {
    clickThr(piece);
  };

  return (
    <div style={{...style}}>
      <div className="pieceContainer">
        <img
          alt="piece"
          className="piece"
          src={img}
          onClick={() =>   {handleClickSel()}}
        ></img>
        {piece.if_select ? (
          <img
            src={imgDicc.Select}
            className="select"
            onClick={() => handleClickSel()}
          ></img>
        ) : null}
        {piece.if_threat ? (
          <img
            src={imgDicc.Threat}
            className="select"
            onClick={() => handleClickThr()}
          ></img>
        ) : null}
      </div>
    </div>
  );
}
