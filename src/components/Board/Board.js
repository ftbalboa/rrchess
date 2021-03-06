import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Board.css";

import Manager from "../../logic/gameManager";

import { PieceReact } from "../Piece/Piece";
import { ItemReact } from "../Items/Items";

export function BoardReact() {
  const [manager, changeManager] = useState(new Manager());
  const [pieces, changePieces] = useState(manager.get_pieces());
  const [posMoves, changePosMoves] = useState([]);
  const [posThreats, changePosThreats] = useState([]);

  //Board flip
  const color = useSelector((state) => state.chess.playerColor);
  const rBoard = [8, 7, 6, 5, 4, 3, 2, 1];
  const posFunction = (pos, way) => {
    let n = way === "row" ? pos[0] : pos[1];
    let forReturn;
    switch (color + " " + way) {
      case "white row":
        forReturn = `${rBoard[n]}`;
        break;
      case "white column":
        forReturn = `${n + 1}`;
        break;
      case "black row":
        forReturn = `${n + 1}`;
        break;
      case "black column":
        forReturn = `${rBoard[n]}`;
        break;
      default:
        return forReturn;
    }
    return forReturn;
  };

  const status = useSelector((state) => state.chess.status);
  const turn = useSelector((state) => state.chess.turn);

  //select piece
  const onClickPiece = (piece) => {
    if (status === "play") {
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
    }
  };

  //move piece
  const onClickPosMov = (pos) => {
    changePosThreats(manager.clean_threats(posThreats));
    manager.mov_piece(pos);
    changePieces([...manager.get_pieces()]);
    changePosMoves([]);
  };

  //eat piece
  const onClickThreat = (piece) => {
    manager.eat(piece);
    changePieces([...manager.get_pieces()]);
    changePosMoves([]);
    changePosThreats(manager.clean_threats(posThreats));
  };

  useEffect(()=>{
    if (color !== turn && status === "play") {
      manager.oponentMove();
    }
    if(status === 'pause' && manager.getMoveStr().length !== 0){
      resetBoard();
      }
  },[status])

  useEffect(async ()=>{
    if (color !== turn && status === "play") {
      manager.oponentMove();
    }
  },[turn])

  // reset board
  const resetBoard = () => {
    manager.resetManager();
    changeManager(new Manager());
    setTimeout(()=>{ changePieces([...manager.get_pieces()]); }, 0);
    changePosMoves([]);
    changePosThreats([]);
  }


  return (
    <div className="Board">
      {posMoves.map((mov, index) => (
        <ItemReact
          key={index}
          pos={mov}
          click={(pos) => {
            onClickPosMov(pos);
          }}
          posFun={(p, w) => posFunction(p, w)}
        />
      ))}
      {pieces.map((piece) => (
        <PieceReact
          key={piece.id}
          piece={piece}
          clickSel={
            turn === color
              ? (piece) => {
                  onClickPiece(piece);
                }
              : () => {}
          }
          clickThr={(piece) => {
            onClickThreat(piece);
          }}
          posFun={(p, w) => posFunction(p, w)}
        />
      ))}
    </div>
  );
}
