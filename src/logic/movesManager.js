//export default GameManager;

//diccionario de funciones de movimiento
// const  {
//   //functions for pieces
//   Horse: horseMoves,
//   King: kingMoves,
//   Bishop: bishopMoves,
//   Rook: rookMoves,
//   Queen: queenMoves,
//   Pawn: pawnMoves
// };

class MovesManager {
  constructor(board) {
    this.board = board;
  }

  horseMoves(piece) {
    let moves = [
      [[2, 1]],
      [[-2, 1]],
      [[2, -1]],
      [[-2, -1]],
      [[1, 2]],
      [[-1, 2]],
      [[1, -2]],
      [[-1, -2]],
    ];
    moves = this.madeProg(piece.get_pos(), moves);
    return this.ajustMoves(piece, moves);
  }

  kingMoves(piece) {
    let moves = [
      [[1, 0]],
      [[-1, 0]],
      [[0, 1]],
      [[0, -1]],
      [[1, 1]],
      [[-1, -1]],
      [[1, -1]],
      [[-1, 1]],
    ];
    moves = this.madeProg(piece.get_pos(), moves);
    return this.ajustMoves(piece, moves);
  }

  rookMoves(piece) {
    let moves = [
      [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
      ],
      [
        [0, -1],
        [0, -2],
        [0, -3],
        [0, -4],
        [0, -5],
        [0, -6],
        [0, -7],
      ],
      [
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
      ],
      [
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0],
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
    ];
    moves = this.madeProg(piece.get_pos(), moves);
    return this.ajustMoves(piece, moves);
  }

  bishopMoves(piece) {
    let moves = [
      [
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
        [7, 7],
      ],
      [
        [-1, -1],
        [-2, -2],
        [-3, -3],
        [-4, -4],
        [-5, -5],
        [-6, -6],
        [-7, -7],
      ],
      [
        [1, -1],
        [2, -2],
        [3, -3],
        [4, -4],
        [5, -5],
        [6, -6],
        [7, -7],
      ],
      [
        [-1, 1],
        [-2, 2],
        [-3, 3],
        [-4, 4],
        [-5, 5],
        [-6, 6],
        [-7, 7],
      ],
    ];
    moves = this.madeProg(piece.get_pos(), moves);
    return this.ajustMoves(piece, moves);
  }

  queenMoves(piece) {
    let bishop = this.bishopMoves(piece);
    let rook = this.rookMoves(piece);
    return [].concat(bishop, rook);
  }

  pawnMoves(piece) {
    let forReturn = [];
    let a = piece.get_color() === "white" ? 1 : -1;
    let moves = [[[1 * a, 0]]];
    let frPush = () => {
      moves = this.madeProg(piece.get_pos(), moves);
      forReturn = [].concat(forReturn, this.ajustMoves(piece, moves));
    };
    frPush();
    if (piece.get_never_move()) {
      moves = [[[2 * a, 0]]];
      frPush();
    }

    let obj = this.board.get_objInPos([
      piece.pos[0] + 1 * a,
      piece.pos[1] + -1,
    ]);
    if (obj && obj != "out" && obj.color != piece.color) {
      moves = [[[1 * a, 1]]];
      frPush();
    }
    obj = this.board.get_objInPos([piece.pos[0] + 1 * a, piece.pos[1] + -1]);
    if (obj && obj != "out" && obj.color != piece.color) {
      moves = [[[1 * a, -1]]];
      frPush();
    }
    return forReturn;
  }

  ajustMoves(piece, moves) {
    // remove moves out of board and block from other pieces and concat moves in the return array
    let forReturn = [];
    for (let i = 0; i < moves["progresiones"]; i++) {
      for (let j = 0; j < moves["data"][i].length; j++) {
        let pos = moves["data"][i][j];
        let square = this.board.get_objInPos(pos);
        if (square) {
          if (square === "out") {
            moves["data"][i].splice(j);
          } else if (square.color === piece.get_color()) {
            moves["data"][i].splice(j);
          } else {
            moves["data"][i].splice(j + 1);
          }
        }
      }
      //add moves in forReturn
      if (moves["data"][i] != [])
        forReturn = [].concat(forReturn, moves["data"][i]);
    }
    // quit check bad moves
    for (let i = 0; i < forReturn.length; i++) {
      if (this.isCheck(piece, moves[i])) moves.slice(i, i + 1);
    }
    return forReturn;
  }

  isCheck(piece = null, mov = null) {
    //TODO
    return false;
  }

  madeProg(pos, moves) {
    let forReturn = {
      progresiones: moves.length,
      data: [],
    };
    for (let mov of moves) {
      for (let i = 0; i < mov.length; i++)
        mov[i] = [mov[i][0] + pos[0], mov[i][1] + pos[1]];
      forReturn["data"].push(mov);
    }
    return forReturn;
  }
}
