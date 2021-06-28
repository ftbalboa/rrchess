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
      "King",
      "Queen",
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

  mov(piece, pos) {
    let old_pos = piece.get_pos();
    this.board[old_pos[0]][old_pos[1]] = null;
    this.board[pos[0]][pos[1]] = piece;
    piece.set_position(pos);
  }

  delete_piece(piece) {
    let index = this.pieces.findIndex((p) => p.id === piece.id);
    this.pieces.splice(index,1);
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

  alpasoHandle(piece,pos){
        if (piece.get_name() === 'Pawn' && Math.abs(pos[0] - piece.pos[0]) > 1){
          let a = piece.get_color() === "white" ? 1 : -1;
          this.alpasoMark = piece;
          this.alpasoPos = [piece.get_pos()[0] + a , piece.get_pos()[1]];
        } else {
          this.alpasoMark = null;
          this.alpasoPos = [];
        }
  }


  //  get_square_color(this, pos):
  //     row = pos[0]
  //     col = pos[1]
  //     if row % 2 == 0:
  //         pos = col + 1
  //     else:
  //         pos = col
  //     if pos % 2 == 0:
  //         return W_SQUARES_COLOR
  //     else:
  //         return B_SQUARES_COLOR

  //  get_n_rows(){return this.rows;}
}

export default Board;
