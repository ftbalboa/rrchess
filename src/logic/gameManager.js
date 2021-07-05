import Board from "./board.js";
import MovesManager from "./movesManager.js";
import { addMove, test } from "../redux/actions/gameActions.js";
import { store } from "../redux/store/store.js";
const PLAY = "play";
const CHECKMATE = "checkmate";
const TABLES = "tables";

const cols = ['a','b','c','d','e','f','g','h'];

class GameManager {
  constructor() {
    this.board = new Board();
    this.selected = false;
    this.turn = this.board.get_colors()[0];
    this.movs = [];
    this.piece_selected = null;
    this.moves_manager = new MovesManager(this.board);
    this.promoves = "Queen";
    this.status = PLAY;
    this.moveStr = ""; 
  }

  possMovs(piece) {
    let movs = this.moves_manager.giveMeMoves(piece);
    this.set_threats(movs.threats);
    return movs;
  }

  select_piece(piece) {
    if (!this.piece_selected && piece.get_color() === this.turn) {
      piece.change_select();
      this.piece_selected = piece;
    } else if (this.piece_selected) {
      this.piece_selected.change_select();
      if (
        this.piece_selected.id !== piece.id &&
        piece.get_color() === this.turn
      ) {
        piece.change_select();
        this.piece_selected = piece;
      } else {
        this.piece_selected = null;
      }
    }
  }

  get_pieces() {
    return this.board.get_pieces();
  }

  mov_piece(pos) {
    this.addToMovList(this.piece_selected.pos,pos);
    // for Redux state
    let movType = "standar";
    //castle handle
    if (
      this.piece_selected.name === "King" &&
      Math.abs(this.piece_selected.get_pos()[1] - pos[1]) > 1
    ) {
      if (this.piece_selected.get_pos()[1] - pos[1] > 0) {
        //queenside
        this.board.mov(this.board.get_objInPos([pos[0], 0]), [pos[0], 3]);
        movType = "longCastle";
      } else {
        //kingside
        this.board.mov(this.board.get_objInPos([pos[0], 7]), [pos[0], 5]);
        movType = "shortCastle";
      }
      store.dispatch(addMove(movType));
    }
    //al paso handle
    if (
      pos[0] === this.board.alpasoPos[0] &&
      pos[1] === this.board.alpasoPos[1] &&
      this.piece_selected.name === "Pawn"
    ) {
      movType = "alPaso";
      store.dispatch(
        addMove(movType, this.piece_selected.name, this.piece_selected.pos, pos)
      );
      this.board.delete_piece(this.board.alpasoMark);
    }
    this.board.alpasoHandle(this.piece_selected, pos);
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
    this.board.mov(this.piece_selected, pos);
    //handle promoves
    if (this.promoves_pawn(this.piece_selected))
      store.dispatch(addMove("promoves", this.promoves));
    //continue
    this.piece_selected.change_select();
    this.piece_selected = null;
    //Change turn
    this.board.get_colors()[0] === this.turn
      ? (this.turn = this.board.get_colors()[1])
      : (this.turn = this.board.get_colors()[0]);
    //checkMate handle
    this.status = this.moves_manager.ifCheckMate(this.turn);
    if (this.status === CHECKMATE) store.dispatch(addMove("checkmate"));
    else if (this.moves_manager.isCheckNow(this.turn))
      store.dispatch(addMove("check"));
  }

  set_threats(threats) {
    threats.forEach((t) => {
      this.board.get_objInPos(t).set_if_threat(true);
    });
  }

  clean_threats(threats) {
    for (let threat of threats) {
      this.board.get_objInPos(threat).set_if_threat(false);
    }
    return [];
  }

  eat(eated_piece) {
    this.addToMovList(this.piece_selected.pos,eated_piece.pos);
    let new_pos = eated_piece.get_pos();
    let ifAmb = this.amb(new_pos);
    let movType = ifAmb.length > 0? 'ambiguosThr' : 'capture';
    store.dispatch(
      addMove(
        movType,
        this.piece_selected.name,
        this.piece_selected.pos,
        new_pos,
        ifAmb
      )
    );
    this.board.delete_piece(eated_piece);
    this.board.mov(this.piece_selected, new_pos);
    //handle promove
    if (this.promoves_pawn(this.piece_selected))
      store.dispatch(addMove("promoves", this.promoves));
    this.piece_selected.change_select();
    this.piece_selected = null;
    this.board.get_colors()[0] === this.turn
      ? (this.turn = this.board.get_colors()[1])
      : (this.turn = this.board.get_colors()[0]);
    //checkMate handle
    this.status = this.moves_manager.ifCheckMate(this.turn);
    if (this.status === CHECKMATE) store.dispatch(addMove("checkMate"));
    else if (this.moves_manager.isCheckNow(this.turn))
      store.dispatch(addMove("check"));
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

  addPromovetoList(){
    let letter = this.promoves[0].toLowerCase();
    if(letter === 'h') letter = 'n'
    this.moveStr = this.moveStr.slice(0, -1);
    this.moveStr = this.moveStr.concat(letter,' ');
  }

  addToMovList(oP, nP){
    let oldPos = [...oP];
    let newPos = [...nP];
    [oldPos[1], newPos[1]] = [cols[oldPos[1]],cols[newPos[1]]];
    [oldPos[0], newPos[0]] = [oldPos[0] + 1, newPos[0] + 1];
    [oldPos[0], oldPos[1]] = [oldPos[1], oldPos[0]];
    [newPos[0], newPos[1]] = [newPos[1], newPos[0]];
    let move = "".concat(oldPos.join(''), newPos.join(''), " ");
    this.moveStr = this.moveStr.concat(move);
  }

  amb(mov) {
    let fR = [];
    let pcs = this.board.pieces.filter(
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
