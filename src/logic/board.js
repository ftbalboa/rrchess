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
    this.label = [];
    for (let i = 0; i < this.rows; i++) {
      let for_push = [];
      for (let j = 0; j < this.cols; j++) for_push.push(null);
      this.board.push(for_push);
    }
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

  get_pieces(){
    return this.pieces;
  }

  //  print_board(){
  //     //Prints on console full board//
  //     for (let i = 0; i < this.rows; i++){
  //         for_append = ''
  //         for col in range(this.cols):
  //             if this.board[row][col] is None:
  //                 for_append += f' {this.board[row][col]}'
  //             else:
  //                 for_append += f' {this.board[row][col].get_name()}'
  //         print(f'{ROW_NAMES[row]}{for_append}')
  //     }
  //     print('   A    B    C    D    E    F    G    H  ')
  //  }

  //  mov(piece, pos):
  //     old_pos = piece.get_position()
  //     this.board[old_pos[0]][old_pos[1]] = None
  //     this.board[pos[0]][pos[1]] = piece
  //     piece.set_position(pos)

  get_board() {
    return this.board;
  }
  get_colors() {
    return this.colors;
  }

  get_objInPos(pos){
    if(pos[0] > this.rows-1 || pos[1] > this.cols-1 || pos[0] < 0 || pos[1] < 0) return "out";
    return this.board[pos[0]][pos[1]];
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
