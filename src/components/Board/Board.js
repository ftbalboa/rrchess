import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBoard } from "../../redux/actions/gameActions";
import styles from "./Board.css";

import Manager from "../../logic/gameManager";

import { PieceReact } from "../Piece/Piece";
import { ItemReact } from "../Items/Items";

export function BoardReact() {
  const [manager, changeManager] = useState(new Manager());
  const [pieces, changePieces] = useState(manager.get_pieces());
  const [posMoves, changePosMoves] = useState([]);
  const [posThreats, changePosThreats] = useState([]);

  const onClickPiece = (piece) => {
    changePosThreats(manager.clean_threats(posThreats));
    manager.select_piece(piece);
    if (piece.if_select) {
      let forHandle = manager.possMovs(piece);
      changePosMoves([...forHandle.moves]);
      changePosThreats([...forHandle.threats]);
    } else {
      changePosMoves([]);
    }
    changePieces([...manager.get_pieces()]);
  };

  const onClickPosMov = (pos) => {
    changePosThreats(manager.clean_threats(posThreats));
    manager.mov_piece(pos);
    changePieces([...manager.get_pieces()]);
    changePosMoves([]);
  };

  const onClickThreat = (piece) => {
    manager.eat(piece);
    changePieces([...manager.get_pieces()]);
    changePosMoves([]);
    changePosThreats(manager.clean_threats(posThreats));
  };

  return (
    <div className="Board">
      {pieces.map((piece) => (
        <PieceReact
          key={piece.id}
          piece={piece}
          clickSel={(piece) => {
            onClickPiece(piece);
          }}
          clickThr={(piece) => {
            onClickThreat(piece);
          }}
        />
      ))}
      {posMoves.map((mov, index) => (
        <ItemReact
          key={index}
          pos={mov}
          click={(pos) => {
            onClickPosMov(pos);
          }}
        />
      ))}
    </div>
  );
}
