import Board from "./board.js";
import MovesManager from "./movesManager.js";

const PLAY = "play";
const CHECKMATE = "checkmate";
const TABLES = "tables";

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
    //castle handle
    if (
      this.piece_selected.name === "King" &&
      Math.abs(this.piece_selected.get_pos()[1] - pos[1]) > 1
    ) {
      if (this.piece_selected.get_pos()[1] - pos[1] < 0) {
        //queenside
        this.board.mov(this.board.get_objInPos([pos[0], 7]), [pos[0], 4]);
      } else {
        //kingside
        this.board.mov(this.board.get_objInPos([pos[0], 0]), [pos[0], 2]);
      }
    }
    //al paso handle
    if (
      pos[0] === this.board.alpasoPos[0] &&
      pos[1] === this.board.alpasoPos[1] &&
      this.piece_selected.name === "Pawn"
    ) {
      this.board.delete_piece(this.board.alpasoMark);
    }
    this.board.alpasoHandle(this.piece_selected, pos);
    //standar
    this.board.mov(this.piece_selected, pos);
    //handle promoves
    this.promoves_pawn(this.piece_selected);
    //continue
    this.piece_selected.change_select();
    this.piece_selected = null;
    //Change turn
    this.board.get_colors()[0] === this.turn
      ? (this.turn = this.board.get_colors()[1])
      : (this.turn = this.board.get_colors()[0]);
    //checkMate handle
    this.status = this.moves_manager.ifCheckMate(this.turn);
  }

  set_threats(threats){
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
    let new_pos = eated_piece.get_pos();
    this.board.delete_piece(eated_piece);
    this.board.mov(this.piece_selected, new_pos);
    //handle promove
    this.promoves_pawn(this.piece_selected);
    this.piece_selected.change_select();
    this.piece_selected = null;
    this.board.get_colors()[0] === this.turn
      ? (this.turn = this.board.get_colors()[1])
      : (this.turn = this.board.get_colors()[0]);
    //checkMate handle
    this.status = this.moves_manager.ifCheckMate(this.turn);
  }

  promoves_pawn(piece) {
    if (
      piece.name === "Pawn" &&
      ((piece.color === "black" && piece.pos[0] === 0) ||
        (piece.color === "white" && piece.pos[0] === 7))
    ) {
      piece.name = this.promoves;
    }
  }
}

export default GameManager;
