import Board from "./board.js";
import MovesManager from "./movesManager.js";

class GameManager {
  constructor() {
    this.board = new Board();
    this.selected = false;
    this.turn = this.board.get_colors()[0];
    this.movs = [];
    this.piece_selected = null;
    this.moves_manager = new MovesManager(this.board);
  }

  is_check() {
    //pass
  }

  possMovs(piece) {
    let forHandle = this.moves_manager.moves(piece);
    if (forHandle instanceof Array) {
      let aux = {
        moves: [],
        threats: [],
      };
      forHandle.forEach((f) => {
        for (let i = 0; i < f.moves.length; i++) aux.moves.push(f.moves[i]);
        for (let j = 0; j < f.threats.length; j++) aux.threats.push(f.threats[j]);
      });
      forHandle = aux;
    }
    return forHandle;
  }

  select_piece(piece) {
    if (!this.piece_selected && piece.get_color() === this.turn) {
      piece.change_select();
      this.piece_selected = piece;
    } else if (this.piece_selected) {
      this.piece_selected.change_select();
      if (this.piece_selected.id !== piece.id) {
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
    this.board.mov(this.piece_selected, pos);
    this.piece_selected.change_select();
    this.piece_selected = null;
    this.board.get_colors()[0] === this.turn
      ? (this.turn = this.board.get_colors()[1])
      : (this.turn = this.board.get_colors()[0]);
  }

  clean_threats(threats) {
    for (let threat of threats) {
      this.board.get_objInPos(threat).set_if_threat(false);
    }
    return [];
  }

  // deselect_all(){
  //         this.gui.hide_label(this.select_item.get_label())
  //         for piece in this.board.get_pieces():
  //             piece.set_if_select(False)
  //         for mov in this.movs:
  //             this.gui.hide_label(mov.get_label())
  //         this.movs = []
  //         this.piece_selected = ""}
}

export default GameManager;
