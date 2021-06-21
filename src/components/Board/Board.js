import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBoard } from "../../redux/actions/gameActions";
import styles from "./Board.css";

import Board from "../../logic/board";

import { PieceReact } from "../Piece/Piece";

export function BoardReact() {
  const [board, changeBoard] = useState(new Board());

  const onClickPiece = () => {
    console.log("here");
  };

  return (
    <div className="Board">
      {board.pieces.map((piece) => (
        <PieceReact key={piece.id} piece={piece} click={onClickPiece} />
      ))}
    </div>
  );
}
