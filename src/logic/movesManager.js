const PLAY = "play";
const CHECKMATE = "checkmate";
const TABLES = "tables";

class MovesManager {
  constructor(board) {
    this.board = board;
    this.alPasoChance = [];
    this.evadeCastle = false; // to eliminate recursion
  }

  moves = (piece) => {
    switch (piece.get_name()) {
      case "Horse":
        return this.horseMoves(piece);
      case "Rook":
        return this.rookMoves(piece);
      case "Bishop":
        return this.bishopMoves(piece);
      case "Queen":
        return this.queenMoves(piece);
      case "King":
        return this.kingMoves(piece);
      case "Pawn":
        return this.pawnMoves(piece);
      default:
        throw new Error("wrong piece name");
    }
  };

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
    moves = this.ajustMoves(piece, moves);
    if (!this.evadeCastle) {
      if (this.can_castle(piece, true))
        moves.moves.push([piece.get_pos()[0], 1]);
      if (this.can_castle(piece, false))
        moves.moves.push([piece.get_pos()[0], 5]);
    }
    return moves;
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
    let frPush = (if_treaths, if_moves) => {
      moves = this.madeProg(piece.get_pos(), moves);
      forReturn = [].concat(
        forReturn,
        this.ajustMoves(piece, moves, if_treaths)
      );
      if (!if_moves) forReturn[forReturn.length - 1].moves = [];
    };
    frPush(false, true);
    if (piece.get_never_move()) {
      moves = [[[2 * a, 0]]];
      frPush(false, true);
    }
    moves = [[[1 * a, 1]]];
    frPush(true, false);
    moves = [[[1 * a, -1]]];
    frPush(true, false);
    if (this.alPasoChance.length > 0) {
      forReturn = [...forReturn, { moves: [this.alPasoChance], threats: [] }];
    }
    return forReturn;
  }

  ajustMoves(piece, moves, if_threats = true) {
    // remove moves out of board and block from other pieces and concat moves in the return array
    let forReturn = [];
    let threats = [];
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
            if (if_threats) {
              threats.push(square.get_pos());
            }
            moves["data"][i].splice(j);
          }
        } else {
          //handle al paso
          if (
            this.board.alpasoMark &&
            piece.name === "Pawn" &&
            piece.color !== this.board.alpasoMark.color
          ) {
            if (
              this.board.alpasoPos[0] === moves["data"][i][j][0] &&
              this.board.alpasoPos[1] === moves["data"][i][j][1]
            ) {
              this.alPasoChance = moves["data"][i][j];
            }
          }
        }
      }
      //add moves in forReturn
      if (moves["data"][i] !== [])
        forReturn = [].concat(forReturn, moves["data"][i]);
    }
    // quit check bad moves
    for (let i = 0; i < forReturn.length; i++) {
      if (!this.evadeCastle && this.isCheck(piece, forReturn[i])) {
        forReturn.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < threats.length; i++) {
      if (!this.evadeCastle && this.isCheck(piece, threats[i])) {
        threats.splice(i, 1);
        i--;
      }
    }
    return { moves: forReturn, threats: threats };
  }

  isCheck(piece, mov) {
    this.evadeCastle = true;
    this.board.init_simulate(piece, mov);
    let forReturn = this.isCheckNow(piece.color);
    this.board.end_simulate();
    this.evadeCastle = false;
    return forReturn;
  }

  isCheckNow(color) {
    let forReturn = false;
    let king = null;
    for (let piece of this.board.pieces) {
      if (piece.name === "King" && piece.color === color) king = piece;
    }
    this.evadeCastle = true;
    for (let p of this.board.pieces) {
      if (p.color !== color) {
        let movs = this._giveMeMoves(p);
        for (let m of movs.threats) {
          if (m[0] === king.pos[0] && m[1] === king.pos[1]) forReturn = true;
        }
      }
    }
    this.evadeCastle = false;
    return forReturn;
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

  can_castle(king, short = false) {
    let forReturn = true;
    let pos = king.get_pos();
    let rook = short
      ? this.board.get_objInPos([pos[0], 0])
      : this.board.get_objInPos([pos[0], 7]);
    if (rook && rook.never_move && king.never_move) {
      //hay piezas en el medio?
      if (rook.pos[1] === 0) {
        if (
          this.board.get_objInPos([pos[0], 1]) ||
          this.board.get_objInPos([pos[0], 2])
        ) {
          forReturn = false;
        } else {
          if (
            this.threats_in_squares(
              [
                [pos[0], 1],
                [pos[0], 2],
              ],
              king.color
            )
          )
            forReturn = false;
        }
      } else {
        if (
          this.board.get_objInPos([pos[0], 4]) ||
          this.board.get_objInPos([pos[0], 5]) ||
          this.board.get_objInPos([pos[0], 6])
        ) {
          forReturn = false;
        } else {
          if (
            this.threats_in_squares(
              [
                [pos[0], 4],
                [pos[0], 5],
                [pos[0], 6],
              ],
              king.color
            )
          )
            forReturn = false;
        }
      }
      //hay amenazas?
    } else {
      //add memory for optimization
      forReturn = false;
    }
    if (forReturn) forReturn = !this.isCheckNow(king.color);
    return forReturn;
  }

  threats_in_squares(pos, color = this.colors[0]) {
    let forReturn = false;
    this.evadeCastle = true;
    for (let p of this.board.pieces) {
      if (p.color !== color) {
        let movs = this._giveMeMoves(p);
        movs.moves.forEach((m) => {
          for (let a of pos) {
            if (m[0] === a[0] && m[1] === a[1]) forReturn = true;
          }
        });
      }
    }
    this.evadeCastle = false;
    return forReturn;
  }

  _giveMeMoves(piece) {
    let forHandle = this.moves(piece);
    if (forHandle instanceof Array) {
      let aux = {
        moves: [],
        threats: [],
      };
      forHandle.forEach((f) => {
        for (let i = 0; i < f.moves.length; i++) aux.moves.push(f.moves[i]);
        for (let j = 0; j < f.threats.length; j++)
          aux.threats.push(f.threats[j]);
      });
      forHandle = aux;
    }
    return forHandle;
  }

  giveMeMoves(piece) {
    //for external use, no simulation
    this.alPasoChance = [];
    return this._giveMeMoves(piece);
  }

  ifCheckMate(color) {
    for (let p of this.board.pieces) {
      if (p.color === color) {
        let movs = this._giveMeMoves(p);
        if (movs.moves.length > 0 || movs.threats.length > 0) {
          return PLAY;
        }
      }
    }
    if (this.isCheckNow(color)) return CHECKMATE;
    else return TABLES;
  }
}

export default MovesManager;
