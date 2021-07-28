import Board from "./board.js";
import MovesManager from "./movesManager.js";
import { addMove, setStatus, setTurn } from "../redux/actions/gameActions.js";
import { store } from "../redux/store/store.js";

import Oponent from "./oponent.js";

const PLAY = "play";
const CHECKMATE = "checkmate";
const TABLES = "tables";

let oponent = new Oponent();

const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

let id = 0;
let turn = "white";
let board = new Board();
let moveStr = "";

const shuffleArr = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

class GameManager {
  constructor() {
    this.id = id;
    id++;
    this.selected = false;
    this.movs = [];
    this.piece_selected = null;
    this.moves_manager = new MovesManager(board);
    this.promoves = "Queen";
    this.status = PLAY;
    oponent.chargeCb(() => {
      this.aux();
    });
  }

  getMoveStr() {
    return moveStr;
  }

  resetManager() {
    id = 0;
    turn = "white";
    board = new Board();
    this.moves_manager = new MovesManager(board);
    moveStr = "";
  }

  async oponentMove(cb) {
    const dif = store.getState().chess.dif;
    let randomMov = false;
    if (dif === "Easy") randomMov = Math.random() < 0.7;
    if (dif === "Medium") randomMov = Math.random() < 0.3;
    if (randomMov) {
      this.aux(false,this.randomMov());
    } else {oponent.reqMove(moveStr);}
  }

  randomMov() {
    const turn = store.getState().chess.turn;
    let arr = [...board.get_pieces()].filter((p) => p.color === turn);
    arr = shuffleArr(arr);
    let mov = null;
    let index = 0;
    while (!mov) {
      const movs = this.possMovs(arr[index],false);
      const mot = Math.random() < 0.5;
      if (mot) {
        if (movs.moves.length > 0) {
          let movArr = shuffleArr([...movs.moves]);
          return { piece: arr[index], pos: movArr[0] };
        }
        if (movs.threats.length > 0) {
          let movArr = shuffleArr([...movs.threats]);
          return { piece: arr[index], pos: movArr[0] };
        }
      } else {
        if (movs.threats.length > 0) {
          let movArr = shuffleArr([...movs.threats]);
          return { piece: arr[index], pos: movArr[0] };
        }
        if (movs.moves.length > 0) {
          let movArr = shuffleArr([...movs.moves]);
          return { piece: arr[index], pos: movArr[0] };
        }
      }
      index++;
    }
  }

  aux(engine = true, movData = null) {
    let mov = movData;
    if (engine) {
      mov = oponent.readMsg();
      mov = this.movToPos(mov);
    }
    this.piece_selected = mov.piece;
    this.piece_selected.change_select();
    let eated_piece = board.get_objInPos(mov.pos);
    if (eated_piece) {
      this.eat(eated_piece);
    } else {
      this.mov_piece(mov.pos);
    }
  }

  movToPos(mov) {
    let pos = mov.slice(-2).split("");
    pos[0] = cols.indexOf(pos[0]);
    pos[1] = Number(pos[1]) - 1;
    [pos[0], pos[1]] = [pos[1], pos[0]];
    let posPiece = mov.slice(0, 2).split("");
    posPiece[0] = cols.indexOf(posPiece[0]);
    posPiece[1] = Number(posPiece[1]) - 1;
    [posPiece[0], posPiece[1]] = [posPiece[1], posPiece[0]];
    let piece = board.get_objInPos(posPiece);
    return {
      piece: piece,
      pos: pos,
    };
  }

  possMovs(piece, thr = true) {
    let movs = this.moves_manager.giveMeMoves(piece);
    thr && this.set_threats(movs.threats);
    return movs;
  }

  select_piece(piece) {
    if (!this.piece_selected && piece.get_color() === turn) {
      piece.change_select();
      this.piece_selected = piece;
    } else if (this.piece_selected) {
      this.piece_selected.change_select();
      if (this.piece_selected.id !== piece.id && piece.get_color() === turn) {
        piece.change_select();
        this.piece_selected = piece;
      } else {
        this.piece_selected = null;
      }
    }
  }

  get_pieces() {
    return board.get_pieces();
  }

  mov_piece(pos) {
    this.addToMovList(this.piece_selected.pos, pos);
    // for Redux state
    let movType = "standar";
    //castle handle
    if (
      this.piece_selected.name === "King" &&
      Math.abs(this.piece_selected.get_pos()[1] - pos[1]) > 1
    ) {
      if (this.piece_selected.get_pos()[1] - pos[1] > 0) {
        //queenside
        board.mov(board.get_objInPos([pos[0], 0]), [pos[0], 3]);
        movType = "longCastle";
      } else {
        //kingside
        board.mov(board.get_objInPos([pos[0], 7]), [pos[0], 5]);
        movType = "shortCastle";
      }
      store.dispatch(addMove(movType));
    }
    //al paso handle
    if (
      pos[0] === board.alpasoPos[0] &&
      pos[1] === board.alpasoPos[1] &&
      this.piece_selected.name === "Pawn"
    ) {
      movType = "alPaso";
      store.dispatch(
        addMove(movType, this.piece_selected.name, this.piece_selected.pos, pos)
      );
      board.delete_piece(board.alpasoMark);
    }
    board.alpasoHandle(this.piece_selected, pos);
    //standar
    if (movType === "standar") {
      let ifAmb = this.amb(pos);
      if (ifAmb.length > 0) movType = "ambiguos";
      store.dispatch(
        addMove(
          movType,
          this.piece_selected.name,
          this.piece_selected.pos,
          pos,
          ifAmb
        )
      );
    }
    board.mov(this.piece_selected, pos);
    //handle promoves
    if (this.promoves_pawn(this.piece_selected))
      store.dispatch(addMove("promoves", this.promoves));
    //continue
    this.piece_selected.change_select();
    this.piece_selected = null;
    //Change turn
    board.get_colors()[0] === turn
      ? (turn = board.get_colors()[1])
      : (turn = board.get_colors()[0]);
    //checkMate handle
    this.status = this.moves_manager.ifCheckMate(turn);
    if (this.status === CHECKMATE) {
      setTimeout(() => {
        store.dispatch(addMove("checkMate"));
      }, 0);
      store.dispatch(setStatus("mated"));
    } else if (this.moves_manager.isCheckNow(turn))
      setTimeout(() => {
        store.dispatch(addMove("check"));
      }, 0);
    store.dispatch(setTurn(turn));
  }

  set_threats(threats) {
    threats.forEach((t) => {
      board.get_objInPos(t).set_if_threat(true);
    });
  }

  clean_threats(threats) {
    for (let threat of threats) {
      board.get_objInPos(threat).set_if_threat(false);
    }
    return [];
  }

  eat(eated_piece) {
    this.addToMovList(this.piece_selected.pos, eated_piece.pos);
    let new_pos = eated_piece.get_pos();
    let ifAmb = this.amb(new_pos);
    let movType = ifAmb.length > 0 ? "ambiguosThr" : "capture";
    store.dispatch(
      addMove(
        movType,
        this.piece_selected.name,
        this.piece_selected.pos,
        new_pos,
        ifAmb
      )
    );
    board.delete_piece(eated_piece);
    board.mov(this.piece_selected, new_pos);
    //handle promove
    if (this.promoves_pawn(this.piece_selected))
      store.dispatch(addMove("promoves", this.promoves));
    this.piece_selected.change_select();
    this.piece_selected = null;
    board.get_colors()[0] === turn
      ? (turn = board.get_colors()[1])
      : (turn = board.get_colors()[0]);
    //checkMate handle
    this.status = this.moves_manager.ifCheckMate(turn);
    if (this.status === CHECKMATE) {
      setTimeout(() => {
        store.dispatch(addMove("checkMate"));
      }, 0);
      store.dispatch(setStatus("mated"));
    } else if (this.moves_manager.isCheckNow(turn))
      setTimeout(() => {
        store.dispatch(addMove("check"));
      }, 0);
    store.dispatch(setTurn(turn));
  }

  promoves_pawn(piece) {
    if (
      piece.name === "Pawn" &&
      ((piece.color === "black" && piece.pos[0] === 0) ||
        (piece.color === "white" && piece.pos[0] === 7))
    ) {
      this.addPromovetoList();
      piece.name = this.promoves;
      return true;
    }
  }

  addPromovetoList() {
    let letter = this.promoves[0].toLowerCase();
    if (letter === "h") letter = "n";
    moveStr = moveStr.slice(0, -1);
    moveStr = moveStr.concat(letter, " ");
  }

  addToMovList(oP, nP) {
    let oldPos = [...oP];
    let newPos = [...nP];
    [oldPos[1], newPos[1]] = [cols[oldPos[1]], cols[newPos[1]]];
    [oldPos[0], newPos[0]] = [oldPos[0] + 1, newPos[0] + 1];
    [oldPos[0], oldPos[1]] = [oldPos[1], oldPos[0]];
    [newPos[0], newPos[1]] = [newPos[1], newPos[0]];
    let move = "".concat(oldPos.join(""), newPos.join(""), " ");
    moveStr = moveStr.concat(move);
  }

  amb(mov) {
    let fR = [];
    let pcs = board.pieces.filter(
      (p) =>
        p.name !== "Pawn" &&
        p.name === this.piece_selected.name &&
        p.color === this.piece_selected.color &&
        p.id !== this.piece_selected.id
    );
    for (let i = 0; i < pcs.length; i++) {
      let movs = this.moves_manager.giveMeMoves(pcs[i]);
      let index = movs.moves.findIndex(
        (m) => m[0] === mov[0] && m[1] === mov[1]
      );
      if (index === -1)
        index = movs.threats.findIndex(
          (m) => m[0] === mov[0] && m[1] === mov[1]
        );
      if (index !== -1) fR.push(pcs[i].pos);
    }
    return fR;
  }
}

export default GameManager;
