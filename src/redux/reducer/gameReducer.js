import { SET_STATUS, SET_COLOR, ADD_MOVE, TEST } from "../constants";

const initialState = {
  playerColor: "white",
  status: null,
  moves: [],
};

const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

const normalMove = (pieceName, initPos, pos, eat, enemy = []) => {
  const amb = enemy.length > 0 ? handleAmb(initPos, enemy) : "";
  const pH = pieceName[0] === "P" ? cols[initPos[1]] : "";
  const x = eat ? pH + "x" : "";
  const letter =
    pieceName[0] === "P" ? "" : pieceName[0] === "H" ? "N" : pieceName[0];
  const mov = "".concat(letter, amb, x, cols[pos[1]], (pos[0] + 1).toString());
  return mov;
};

const handleAmb = (initPos, enemy = []) => {
  let fR = "";
  let [r, c] = [1, 2];
  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i][0] === initPos[0]) {
      r = 0;
    }
    if (enemy[i][1] === initPos[1]) {
      c = 0;
    }
  }
  switch (r + c) {
    case 0:
      fR = cols[initPos[1]] + (initPos[0] + 1).toString();
      break;
    case 1:
      fR = (initPos[0] + 1).toString();
      break;
    case 2:
      fR = cols[initPos[1]];
      break;
    case 3:
      fR = cols[initPos[1]];
      break;
    default:
      fR = "";
      break;
  }
  return fR;
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, status: action.payload };

    case SET_COLOR:
      return { ...state, playerColor: action.payload };

    case ADD_MOVE:
      const { movType, pos, pieceName, initPos, ambPos } = action.payload;
      let newMove = "";
      switch (movType) {
        case "standar":
          newMove = normalMove(pieceName, initPos, pos, false);
          break;
        case "capture":
          newMove = normalMove(pieceName, initPos, pos, true);
          break;
        case "shortCastle":
          newMove = "O-O";
          break;
        case "longCastle":
          newMove = "O-O-O";
          break;
        case "alPaso":
          newMove = normalMove(pieceName, initPos, pos, true);
          break;
        case "promoves":
          let fH = [...state.moves];
          const letter =
            pieceName[0] === "P"
              ? ""
              : pieceName[0] === "H"
              ? "N"
              : pieceName[0];
          fH[fH.length - 1] = fH[fH.length - 1] + "=" + letter;
          return { ...state, moves: fH };

        case "ambiguos":
          newMove = normalMove(pieceName, initPos, pos, false, ambPos);
          break;

        case "ambiguosTrh":
          newMove = normalMove(pieceName, initPos, pos, true, ambPos);
          break;

        case "check":
          let fC = [...state.moves];
          fC[fC.length - 1] = fC[fC.length - 1] + "+";
          return { ...state, moves: fC };

        case "checkMate":
          let fM = [...state.moves];
          fM[fM.length - 1] = fM[fM.length - 1] + "#";
          return { ...state, moves: fM };
      }

      return { ...state, moves: [...state.moves, newMove] };

    case TEST:
      console.log("from redux test:");
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
