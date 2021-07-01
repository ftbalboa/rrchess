import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPiece } from "../../redux/actions/gameActions";
import "./Piece.css";

//Images
import BpImg from "../../img/blackPawn.png";
import BrImg from "../../img/blackRook.png";
import BhImg from "../../img/blackHorse.png";
import BbImg from "../../img/blackBishop.png";
import BqImg from "../../img/blackQueen.png";
import BkImg from "../../img/blackKing.png";
import WpImg from "../../img/whitePawn.png";
import WrImg from "../../img/whiteRook.png";
import WhImg from "../../img/whiteHorse.png";
import WbImg from "../../img/whiteBishop.png";
import WqImg from "../../img/whiteQueen.png";
import WkImg from "../../img/whiteKing.png";
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
  const style = {
    backgroundColor: "transparent",
    gridColumn: posFun(piece.pos,'column'),
    gridRow:  posFun(piece.pos,'row'),
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "all",
  };
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
