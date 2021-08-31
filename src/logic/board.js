import Piece from "./pieces.js";

class Board {
  //Creates and stocks pieces

  constructor() {
    this.board = [];
    this.colors = ["white", "black"];
    this.pieceOrder = [
      "Rook",
      "Horse",
      "Bishop",
      "Queen",
      "King",
      "Bishop",
      "Horse",
      "Rook",
      "Pawn",
      "Pawn",
      "Pawn",
      "Pawn",
      "Pawn",
      "Pawn",
      "Pawn",
      "Pawn",
    ];
    this.pieces = [];
    this.rows = 8;
    this.cols = 8;
    this.offset_x = 12;
    this.offset_y = 12;
    this.side_size = 75;
    for (let i = 0; i < this.rows; i++) {
      let for_push = [];
      for (let j = 0; j < this.cols; j++) for_push.push(null);
      this.board.push(for_push);
    }
    this.alpasoMark = null;
    this.alpasoPos = [];
    this.forSimulate = {
      piece: null,
      deletePiece: null,
      old_pos: null,
    };
    this.__init_position();
  }

  __init_position() {
    //Set initial position for pieces, store and create them//
    for (let color of this.colors) {
      let row = color === "white" ? 0 : this.rows - 1;
      let col = 0;
      for (let item of this.pieceOrder) {
        let piece = new Piece(item, color, [row, col]);
        this.board[row][col] = piece;
        this.pieces.push(piece);
        col += 1;
        if (col === this.cols) {
          col = 0;
          row = color === "white" ? row + 1 : row - 1;
        }
      }
    }
  }

  get_pieces() {
    return this.pieces;
  }

  mov(piece, pos, silence = false) {
    let old_pos = piece.get_pos();
    this.board[old_pos[0]][old_pos[1]] = null;
    this.board[pos[0]][pos[1]] = piece;
    piece.set_position(pos, silence);
  }

  delete_piece(piece, forEver) {
    let index = this.pieces.findIndex((p) => p.id === piece.id);
    this.pieces.splice(index, 1);
    piece.alive = false;
    if(forEver) {this.board[piece.pos[0]][piece.pos[1]] = null;}
  }

  init_simulate(piece, pos) {
    if (this.board[pos[0]][pos[1]] === null) {
      this.forSimulate.piece = piece;
      this.forSimulate.old_pos = piece.pos;
      this.mov(piece, pos, true);
    } else {
      if (this.board[pos[0]][pos[1]].name !== "King")
        this.forSimulate.piece = piece;
      this.forSimulate.old_pos = piece.pos;
      this.forSimulate.deletePiece = this.board[pos[0]][pos[1]];
      this.delete_piece(this.forSimulate.deletePiece);
      this.mov(piece, pos, true);
    }
  }

  end_simulate() {
    let deletePos = this.forSimulate.piece.pos;
    this.mov(this.forSimulate.piece, this.forSimulate.old_pos, true);
    if (this.forSimulate.deletePiece) {
      this.pieces.push(this.forSimulate.deletePiece);
      this.forSimulate.deletePiece.alive = true;
    }
    this.board[deletePos[0]][deletePos[1]] = this.forSimulate.deletePiece
      ? this.forSimulate.deletePiece
      : null;
    this.forSimulate = {
      piece: null,
      deletePiece: null,
      old_pos: null,
    };
  }

  get_board() {
    return this.board;
  }
  get_colors() {
    return this.colors;
  }

  get_objInPos(pos) {
    if (
      pos[0] > this.rows - 1 ||
      pos[1] > this.cols - 1 ||
      pos[0] < 0 ||
      pos[1] < 0
    )
      return "out";
    return this.board[pos[0]][pos[1]];
  }

  alpasoHandle(piece, pos) {
    if (piece.get_name() === "Pawn" && Math.abs(pos[0] - piece.pos[0]) > 1) {
      let a = piece.get_color() === "white" ? 1 : -1;
      this.alpasoMark = piece;
      this.alpasoPos = [piece.get_pos()[0] + a, piece.get_pos()[1]];
    } else {
      this.alpasoMark = null;
      this.alpasoPos = [];
    }
  }

  fen() {
    let forReturn = "";
    let n = 0;
    for (let i = 7; i > -1; i--) {
      for (let j = 0; j < 8; j++) {
        let p = this.board[i][j];
        if (p) {
          if (n > 0) {
            forReturn = forReturn.concat(`${n}`);
          }
          let letter = p.name[0];
          if (letter === "H") letter = "N";
          letter = p.color === "white" ? letter : letter.toLowerCase();
          forReturn = forReturn.concat(letter);
          n = 0;
        } else {
          n++;
        }
      }
      if (n > 0) {
        forReturn = forReturn.concat(`${n}`);
      }
      forReturn = forReturn.concat("/");
      n = 0;
    }
    return forReturn;
  }
}

export default Board;
